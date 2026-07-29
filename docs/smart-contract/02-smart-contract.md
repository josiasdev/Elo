# Smart Contract — Funções Públicas

O contrato `EloCivContract` é implementado em `contracts/elociv-registry/src/contract.rs` e expõe cinco funções públicas. Todas retornam `Result<T, ContractError>`, onde `T` é o tipo de retorno bem-sucedido (que pode ser `()` para operações sem valor de retorno).

As funções que requerem autorização do admin fazem isso via `admin.require_auth()`. Quando chamadas sem a assinatura correta, o Soroban SDK rejeita a transação antes mesmo do código do contrato ser executado (a falha se manifesta como erro de host, não como `ContractError`).

---

## `initialize`

```rust
pub fn initialize(env: Env, admin: Address) -> Result<(), ContractError>
```

### Descrição

Configura o endereço do admin (emissor técnico/custodiante) na primeira e única vez que o contrato é inicializado. Após essa chamada, o endereço do admin fica armazenado no Instance Storage do contrato.

### Parâmetros

| Parâmetro | Tipo    | Descrição                                      |
|-----------|---------|------------------------------------------------|
| env       | Env     | Ambiente de execução injetado pelo Soroban SDK |
| admin     | Address | Endereço Stellar da conta custodiante          |

### Retorno

`Ok(())` em caso de sucesso.

### Autorização

Nenhuma. `initialize` não exige `require_auth`. Qualquer conta pode chamá-la — mas apenas uma vez.

### Eventos emitidos

Nenhum.

### Erros possíveis

| Erro                | Condição                                           |
|---------------------|----------------------------------------------------|
| AlreadyInitialized  | O admin já foi definido em uma chamada anterior    |

### Comportamento

A função verifica se já existe um admin armazenado via `storage::has_admin`. Se sim, retorna erro imediatamente. Caso contrário, chama `storage::set_admin`, que persiste o endereço e estende o TTL do Instance Storage.

---

## `anchor_credential`

```rust
pub fn anchor_credential(env: Env, hash: BytesN<32>) -> Result<(), ContractError>
```

### Descrição

Registra um hash SHA-256 (gerado off-chain pelo backend) como prova de existência de uma credencial. Cria o registro `Credential` com o timestamp atual do ledger, o status `is_revoked = false` e o endereço do admin como emissor.

### Parâmetros

| Parâmetro | Tipo        | Descrição                                      |
|-----------|-------------|------------------------------------------------|
| env       | Env         | Ambiente de execução injetado pelo Soroban SDK |
| hash      | BytesN<32>  | Hash SHA-256 de 32 bytes da credencial         |

### Retorno

`Ok(())` em caso de sucesso.

### Autorização

Exige `require_auth` do endereço armazenado como admin. A transação deve ser assinada pela conta custodiante.

### Eventos emitidos

| Tópico                  | Valor                      |
|-------------------------|----------------------------|
| `("anchor", hash)`      | `timestamp` (u64) do ledger|

### Erros possíveis

| Erro                    | Condição                                           |
|-------------------------|----------------------------------------------------|
| NotAuthorized           | O admin não foi configurado ainda                  |
| CredentialAlreadyExists | Já existe uma credencial com esse hash no storage  |

### Comportamento

1. Recupera o endereço do admin via `storage::get_admin`. Se não configurado, retorna `NotAuthorized`.
2. Chama `require_auth` no endereço do admin.
3. Verifica via `storage::has_credential` se o hash já está armazenado. Se sim, retorna `CredentialAlreadyExists`.
4. Cria o struct `Credential` com `timestamp = env.ledger().timestamp()`, `is_revoked = false` e `issuer = admin`.
5. Persiste o registro via `storage::set_credential`.
6. Emite o evento `("anchor", hash)` com o timestamp como dado.

---

## `verify_credential`

```rust
pub fn verify_credential(env: Env, hash: BytesN<32>) -> Result<Credential, ContractError>
```

### Descrição

Consulta e retorna os dados de uma credencial armazenada pelo hash. Essa função é pública e não requer autorização — qualquer conta ou sistema pode consultá-la.

### Parâmetros

| Parâmetro | Tipo        | Descrição                                      |
|-----------|-------------|------------------------------------------------|
| env       | Env         | Ambiente de execução injetado pelo Soroban SDK |
| hash      | BytesN<32>  | Hash SHA-256 de 32 bytes da credencial         |

### Retorno

`Ok(Credential)` — a struct com `timestamp`, `is_revoked` e `issuer`.

### Autorização

Nenhuma. Qualquer conta pode chamar esta função.

### Eventos emitidos

Nenhum.

### Erros possíveis

| Erro                 | Condição                                     |
|----------------------|----------------------------------------------|
| CredentialNotFound   | Não existe credencial com esse hash no storage |

### Comportamento

Delega diretamente para `storage::get_credential`, que consulta o Persistent Storage pelo hash e retorna o struct `Credential` ou o erro `CredentialNotFound`.

---

## `revoke_credential`

```rust
pub fn revoke_credential(env: Env, hash: BytesN<32>, reason: String) -> Result<(), ContractError>
```

### Descrição

Marca uma credencial existente como revogada, atualizando o campo `is_revoked` para `true`. O registro não é apagado do storage — a prova de existência é mantida permanentemente, apenas com o status atualizado.

### Parâmetros

| Parâmetro | Tipo        | Descrição                                      |
|-----------|-------------|------------------------------------------------|
| env       | Env         | Ambiente de execução injetado pelo Soroban SDK |
| hash      | BytesN<32>  | Hash SHA-256 da credencial a ser revogada      |
| reason    | String      | Motivo da revogação (armazenado apenas no evento, não no storage) |

### Retorno

`Ok(())` em caso de sucesso.

### Autorização

Exige `require_auth` do endereço armazenado como admin.

### Eventos emitidos

| Tópico                  | Valor                     |
|-------------------------|---------------------------|
| `("revoke", hash)`      | `reason` (String)         |

### Erros possíveis

| Erro                 | Condição                                          |
|----------------------|---------------------------------------------------|
| NotAuthorized        | O admin não foi configurado ainda                 |
| CredentialNotFound   | Não existe credencial com esse hash no storage    |

### Comportamento

1. Recupera o endereço do admin via `storage::get_admin`. Se não configurado, retorna `NotAuthorized`.
2. Chama `require_auth` no endereço do admin.
3. Recupera o struct `Credential` via `storage::get_credential`. Se não existir, retorna `CredentialNotFound`.
4. Atualiza `credential.is_revoked = true`.
5. Persiste o registro atualizado via `storage::set_credential` (sobrescrevendo o anterior).
6. Emite o evento `("revoke", hash)` com o motivo como dado.

O motivo da revogação (`reason`) é registrado apenas no evento da transação e não é armazenado no storage on-chain.

---

## `transfer_admin`

```rust
pub fn transfer_admin(env: Env, new_admin: Address) -> Result<(), ContractError>
```

### Descrição

Transfere a titularidade do contrato para um novo endereço. Após a execução bem-sucedida, somente o novo admin tem autoridade para ancorar e revogar credenciais. O admin anterior perde todos os privilégios imediatamente.

### Parâmetros

| Parâmetro | Tipo    | Descrição                                              |
|-----------|---------|--------------------------------------------------------|
| env       | Env     | Ambiente de execução injetado pelo Soroban SDK         |
| new_admin | Address | Endereço Stellar da nova conta custodiante             |

### Retorno

`Ok(())` em caso de sucesso.

### Autorização

Exige `require_auth` do endereço atualmente armazenado como admin.

### Eventos emitidos

| Tópico                              | Valor                     |
|-------------------------------------|---------------------------|
| `("transfer", current_admin)`       | `new_admin` (Address)     |

### Erros possíveis

| Erro          | Condição                                |
|---------------|-----------------------------------------|
| NotAuthorized | O admin não foi configurado ainda       |

### Comportamento

1. Recupera o endereço do admin atual via `storage::get_admin`. Se não configurado, retorna `NotAuthorized`.
2. Chama `require_auth` no endereço do admin atual.
3. Sobrescreve o endereço do admin via `storage::set_admin` com `new_admin`.
4. Emite o evento `("transfer", current_admin)` com o novo admin como dado.

A partir do momento em que o ledger confirma essa transação, qualquer chamada assinada pelo admin anterior será rejeitada pelo `require_auth`, pois o endereço armazenado no contrato já é o novo.
