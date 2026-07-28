# Comandos CLI — Invocação do Contrato

Este documento lista todos os comandos do Stellar CLI para invocar as funções do contrato `elociv-registry` na testnet, com exemplos reais de uso e o resultado esperado de cada operação.

## Variáveis de ambiente

Os exemplos assumem que as seguintes variáveis de ambiente estão definidas:

```bash
export ADMIN_ADDR=$(stellar keys address admin)
export CONTRACT_ID=<CONTRACT_ID retornado pelo deploy>
```

Consulte `docs/07-build-e-deploy.md` para obter esses valores.

---

## `initialize`

Configura o admin do contrato. Deve ser chamada uma única vez após o deploy.

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  initialize \
  --admin $ADMIN_ADDR
```

**Resultado esperado:** a CLI exibe `null` ou uma linha em branco, indicando retorno `Ok(())`.

**Se chamada novamente (reinitialization bloqueada):**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  initialize \
  --admin $ADMIN_ADDR
```

**Resultado esperado:** a CLI exibe um erro contendo o código `1` (AlreadyInitialized). A transação é rejeitada.

---

## `anchor_credential`

Ancora um hash SHA-256 de 32 bytes no contrato. O hash deve ser gerado off-chain pelo backend.

O parâmetro `--hash` aceita o hash em formato hexadecimal de 64 caracteres (32 bytes em hex).

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  anchor_credential \
  --hash 0101010101010101010101010101010101010101010101010101010101010101
```

O exemplo usa um hash de teste (`01` repetido 32 vezes em hex). Em uso real, o backend fornece o SHA-256 real dos dados da credencial.

**Resultado esperado:** a CLI exibe `null`, indicando retorno `Ok(())`. Um evento com tópico `anchor` é emitido na transação.

**Se o mesmo hash for ancorado novamente (duplicata bloqueada):**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  anchor_credential \
  --hash 0101010101010101010101010101010101010101010101010101010101010101
```

**Resultado esperado:** a CLI exibe um erro contendo o código `4` (CredentialAlreadyExists).

---

## `verify_credential`

Consulta os dados de uma credencial pelo hash. Não exige autorização — qualquer conta pode chamar.

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  verify_credential \
  --hash 0101010101010101010101010101010101010101010101010101010101010101
```

**Resultado esperado:** a CLI exibe o struct `Credential` serializado em JSON, contendo os campos `timestamp`, `is_revoked` e `issuer`. Exemplo de saída:

```json
{
  "timestamp": 1753000000,
  "is_revoked": false,
  "issuer": "GADM1NADDR..."
}
```

**Se o hash não existir:**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  verify_credential \
  --hash ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
```

**Resultado esperado:** a CLI exibe um erro contendo o código `3` (CredentialNotFound).

---

## `revoke_credential`

Marca uma credencial como revogada. Exige autorização do admin. O registro não é apagado.

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  revoke_credential \
  --hash 0101010101010101010101010101010101010101010101010101010101010101 \
  --reason "Fraude detectada na instituicao parceira"
```

**Resultado esperado:** a CLI exibe `null`, indicando retorno `Ok(())`. Um evento com tópico `revoke` é emitido, contendo o motivo.

**Confirmar que o histórico não foi apagado após a revogação:**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  verify_credential \
  --hash 0101010101010101010101010101010101010101010101010101010101010101
```

**Resultado esperado:** o mesmo struct `Credential` é retornado, mas agora com `"is_revoked": true`. O campo `timestamp` e `issuer` permanecem inalterados, provando que o histórico foi preservado.

**Tentar revogar um hash inexistente:**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  revoke_credential \
  --hash ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff \
  --reason "Teste"
```

**Resultado esperado:** a CLI exibe um erro contendo o código `3` (CredentialNotFound).

---

## `transfer_admin`

Transfere a titularidade do contrato para um novo endereço. Exige autorização do admin atual.

Primeiro, crie um segundo par de chaves para representar o novo custodiante:

```bash
stellar keys generate new_admin --network testnet
stellar keys fund new_admin --network testnet
export NEW_ADMIN_ADDR=$(stellar keys address new_admin)
```

Execute a transferência usando a identidade do admin atual:

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  transfer_admin \
  --new_admin $NEW_ADMIN_ADDR
```

**Resultado esperado:** a CLI exibe `null`, indicando retorno `Ok(())`. Um evento com tópico `transfer` é emitido contendo os dois endereços.

**Confirmar que o novo admin pode ancorar credenciais:**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source new_admin \
  --network testnet \
  -- \
  anchor_credential \
  --hash 0202020202020202020202020202020202020202020202020202020202020202
```

**Resultado esperado:** `null` — a ancoragem foi bem-sucedida com a identidade `new_admin`.

**Confirmar que o admin antigo perdeu os privilégios imediatamente:**

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  anchor_credential \
  --hash 0303030303030303030303030303030303030303030303030303030303030303
```

**Resultado esperado:** a CLI exibe um erro de autorização. O admin antigo não tem mais permissão para ancorar credenciais, pois o endereço armazenado no contrato foi substituído pelo novo admin. O erro reportado pelo Soroban host é um erro de autorização (não necessariamente o `ContractError::NotAuthorized` com código 2, mas um erro de host nativo de autorização).

---

## Fluxo Completo de Teste Manual

A sequência abaixo representa um ciclo completo de uso do contrato para validação manual em testnet:

```bash
# 1. Gerar identidade e financiar
stellar keys generate admin --network testnet
stellar keys fund admin --network testnet
export ADMIN_ADDR=$(stellar keys address admin)

# 2. Compilar e fazer deploy
stellar contract build
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/elociv_registry.wasm \
  --source admin \
  --network testnet
export CONTRACT_ID=<valor retornado acima>

# 3. Inicializar
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- initialize \
  --admin $ADMIN_ADDR

# 4. Ancorar uma credencial
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- anchor_credential \
  --hash aabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccdd

# 5. Verificar a credencial
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- verify_credential \
  --hash aabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccdd

# 6. Revogar a credencial
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- revoke_credential \
  --hash aabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccdd \
  --reason "Motivo da revogacao"

# 7. Verificar novamente para confirmar que o histórico foi preservado
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- verify_credential \
  --hash aabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccddaabbccdd
```
