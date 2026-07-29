# Integração com Backend Node.js

O backend Node.js (Fastify ou Express) é o componente planejado que fará a ponte entre as instituições parceiras e o smart contract `elociv-registry`. Esta integração não está implementada neste repositório — este documento descreve o contrato de integração que o backend deverá respeitar.

---

## Modelo de Responsabilidades

| Responsabilidade                              | Backend | Contrato |
|-----------------------------------------------|---------|----------|
| Autenticar instituições parceiras             | Sim     | Nao      |
| Receber dados pessoais da credencial          | Sim     | Nunca    |
| Gerar o hash SHA-256 dos dados                | Sim     | Nao      |
| Assinar e submeter transações na Stellar      | Sim     | N/A      |
| Armazenar o hash e timestamp on-chain         | Nao     | Sim      |
| Verificar o estado de uma credencial          | Nao     | Sim      |
| Emitir eventos auditáveis por transação       | Nao     | Sim      |

---

## Quem Assina as Transações

O backend EloCiv opera com um único par de chaves — o custodiante — que corresponde ao endereço configurado como `admin` no contrato via `initialize`. Todas as transações que modificam estado no contrato (`anchor_credential`, `revoke_credential`, `transfer_admin`) devem ser assinadas por esse par de chaves.

A chave privada do custodiante nunca deve trafegar para o frontend nem ser exposta a instituições parceiras. Ela deve ser armazenada de forma segura no servidor do backend (variável de ambiente ou cofre de segredos).

---

## Geração do Hash SHA-256

O hash SHA-256 enviado ao contrato deve ser gerado pelo backend a partir dos dados estruturados da credencial. O schema de entrada do hash (quais campos são incluídos e em qual ordem) deve ser:

- Definido e documentado pelo backend.
- Aplicado de forma consistente a cada credencial.
- Armazenado de forma off-chain associado ao hash (para que o backend possa recomputar o hash e verificar a credencial no futuro).

Em Node.js, a geração do hash pode ser feita com o módulo nativo `crypto`:

```javascript
const crypto = require('crypto');

function gerarHashCredencial(dados) {
  const payload = JSON.stringify(dados, Object.keys(dados).sort());
  return crypto.createHash('sha256').update(payload).digest('hex');
}
```

O resultado é uma string hexadecimal de 64 caracteres, que corresponde ao `BytesN<32>` esperado pelo contrato.

---

## Mapeamento de ContractError para HTTP

Quando uma transação falha, o Stellar SDK retorna um erro que inclui o código numérico do `ContractError`. O backend deve inspecionar esse código e retornar a resposta HTTP adequada ao cliente.

| Código ContractError | Variante               | Status HTTP | Mensagem sugerida na resposta                              |
|----------------------|------------------------|-------------|------------------------------------------------------------|
| 1                    | AlreadyInitialized     | 500         | "Erro interno: contrato já inicializado."                  |
| 2                    | NotAuthorized          | 403         | "Não autorizado para esta operação."                       |
| 3                    | CredentialNotFound     | 404         | "Credencial não encontrada."                               |
| 4                    | CredentialAlreadyExists| 409         | "Já existe uma credencial registrada com este identificador." |

Erros de autorização do host Soroban (quando `require_auth` falha antes do código do contrato ser executado) também devem ser mapeados para 403.

---

## O que Nunca Deve Ser Enviado ao Contrato

As seguintes categorias de dados nunca devem aparecer como parâmetro em nenhuma transação ao contrato:

- Nome completo do jovem ou da instituição.
- Data de nascimento, CPF, RG ou qualquer documento identificador.
- Endereço residencial ou informações de geolocalização pessoal.
- E-mail, telefone ou qualquer dado de contato.
- Descrição textual da atividade que permita identificação.

O contrato é uma camada de prova de existência e integridade. O único dado que deve chegar a ele é o hash SHA-256, o `CONTRACT_ID` de destino e a assinatura do custodiante.

---

## Rotas Esperadas do Backend (Planejado)

O backend deverá expor rotas que correspondam às operações do contrato. A estrutura abaixo é uma proposta — a implementação real deverá definir autenticação, validação e schema de corpo.

### POST /credenciais

Recebe os dados de uma credencial, gera o hash e chama `anchor_credential`.

Corpo esperado (dados ficam off-chain no backend):
```json
{
  "jovem_id": "...",
  "instituicao_id": "...",
  "atividade": "...",
  "data": "..."
}
```

O backend gera o hash, chama o contrato e retorna o hash e o `transaction_hash` da Stellar.

### GET /credenciais/:hash

Chama `verify_credential` no contrato e retorna o estado atual da credencial.

Resposta esperada:
```json
{
  "hash": "...",
  "timestamp": 1753000000,
  "is_revoked": false,
  "issuer": "G..."
}
```

### DELETE /credenciais/:hash

Recebe um motivo de revogação e chama `revoke_credential`.

### PUT /admin

Chama `transfer_admin` para transferir a custódia para um novo endereço. Operação administrativa de alto impacto — deve exigir autenticação reforçada.

---

## Bibliotecas Recomendadas para Integração

Para interagir com a Stellar a partir de Node.js, a biblioteca oficial é o Stellar SDK for JavaScript:

```
@stellar/stellar-sdk
```

Ela fornece utilitários para construir, assinar e submeter transações, além de decodificar respostas XDR retornadas pelo contrato.

A documentação oficial está disponível em https://stellar.github.io/js-stellar-sdk/.
