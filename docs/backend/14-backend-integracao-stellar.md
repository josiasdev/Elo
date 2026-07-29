# Integração com Blockchain Stellar / Soroban

O backend EloCiv interage com o smart contract Soroban `elociv-registry` implantado na rede **Stellar Testnet**.

---

## Modelo de Custodiante Único (Custodial Backend)

As instituições parceiras (ONGs, coletivos e escolas) operam o sistema através de rotas autenticadas convencionais. Elas não possuem nem gerenciam carteiras Web3.

O backend armazena com segurança as credenciais da conta custodiante:
- `ELOCIV_ISSUER_PUBLIC_KEY`: Endereço público Stellar que é configurado como `admin` do contrato inteligente.
- `ELOCIV_ISSUER_SECRET_KEY`: Chave secreta usada para assinar digitalmente todas as transações enviadas para a rede Stellar.

---

## Algoritmo de Hashing Canônico (SHA-256)

Para garantir que a prova de integridade ancorada na blockchain possa ser verificada por qualquer entidade de forma determinística (RNF08), a função `hashCredential` (`backend/src/services/credential.ts`) aplica as seguintes regras:

1. Seleciona exclusivamente os campos de metadados da credencial (sem nenhum dado pessoal de adolescente):
   - `institution_id`
   - `institution_nome`
   - `opportunity_titulo`
   - `opportunity_tipo`
   - `ods`
   - `faixa_etaria`
   - `periodo_inicio`
   - `periodo_fim`
   - `municipio_id`
   - `emitida_em`
   - `emissor`
2. Ordena as chaves do objeto em ordem alfabética (`Object.keys().sort()`).
3. Serializa a estrutura para JSON canônico sem espaços ou formatações extras.
4. Aplica a função de hash SHA-256 via módulo nativo `crypto` do Node.js, gerando uma string Hexadecimal de exatamente 64 caracteres (32 bytes).

---

## Fluxo Técnico de Ancoragem (`anchorCredential`)

Implementado no serviço `backend/src/services/blockchain.ts`:

1. **Codificação do Hash**: Converte a string Hexadecimal de 64 caracteres em um buffer de 32 bytes (`Buffer.from(hashHex, 'hex')`).
2. **Construção do Argumento Soroban**: Converte o buffer de 32 bytes no tipo XDR de bytes nativo do Soroban (`xdr.ScVal.scvBytes(hashBytes)`).
3. **Montagem da Transação**: Utiliza `contract.call('anchor_credential', hashScVal)` do `@stellar/stellar-sdk`.
4. **Simulação e Assinatura**: Invoca `server.prepareTransaction(tx)` para calcular as taxas e o footprint de storage do ledger e assina a transação com a `ELOCIV_ISSUER_SECRET_KEY`.
5. **Submissão e Polling**: Envia a transação via `server.sendTransaction` e realiza polling em `server.getTransaction` até obter a confirmação do ledger.

---

## Mapeamento de Erros e Resiliência

Quando a chamada Soroban retorna uma falha de contrato, o backend decodifica o erro numérico (`ContractError`) definido no código Rust do contrato:

| Código Soroban | Variante Rust | Truncamento / Ação no Backend | Código HTTP |
|---|---|---|---|
| 1 | `AlreadyInitialized` | O contrato já possui admin configurado. | 500 Internal Server Error |
| 2 | `NotAuthorized` | A assinatura enviada não é do admin custodiante. | 403 Forbidden |
| 3 | `CredentialNotFound` | O hash consultado não existe no Persistent Storage. | 404 Not Found |
| 4 | `CredentialAlreadyExists` | O hash já foi ancorado anteriormente. | 409 Conflict |

### Resiliência contra Quedas de RPC (RNF07)

Se a rede Stellar estiver temporariamente inacessível durante a emissão de uma credencial:
- A credencial é salva no banco PostgreSQL com o status `PENDENTE_ANCORAGEM`.
- O endpoint retorna resposta HTTP `202 Accepted` contendo o hash e a mensagem informando que a ancoragem está pendente.
- A rota `POST /credentials/:id/anchor` permite reprocessar a ancoragem assim que a rede restabelecer o serviço.
