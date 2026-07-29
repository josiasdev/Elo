# Testes Unitários

## Executar os testes

Os testes estão em `contracts/elociv-registry/src/test.rs`. Para executá-los, rode o seguinte comando na raiz do workspace:

```bash
cargo test --package elociv-registry
```

Para ver a saída detalhada (incluindo nomes dos testes e tempo de execução):

```bash
cargo test --package elociv-registry -- --nocapture
```

O resultado esperado é uma linha `test result: ok. 6 passed; 0 failed` ao final.

---

## Estrutura dos Testes

O arquivo `test.rs` usa o atributo `#![cfg(test)]` para que seu conteúdo seja compilado apenas quando os testes estão ativos. Dois helpers são definidos para reutilização:

```rust
fn create_contract(env: &Env) -> EloCivContractClient<'_> {
    let contract_id = env.register_contract(None, EloCivContract);
    EloCivContractClient::new(env, &contract_id)
}

fn dummy_hash(env: &Env, seed: u8) -> BytesN<32> {
    BytesN::from_array(env, &[seed; 32])
}
```

- `create_contract`: registra o contrato em um ambiente de simulação isolado e retorna o cliente tipado gerado pelo Soroban SDK. Cada teste cria seu próprio `Env::default()`, garantindo isolamento completo entre testes.
- `dummy_hash`: cria um `BytesN<32>` preenchido com um único byte repetido 32 vezes. Permite criar hashes distintos por seed sem precisar de hashing real nos testes.

---

## Descrição de Cada Teste

### `test_initialize_and_prevent_reinitialization`

```rust
#[test]
fn test_initialize_and_prevent_reinitialization()
```

**O que verifica:** que o contrato aceita a primeira chamada a `initialize` e rejeita qualquer chamada subsequente com o erro `AlreadyInitialized`.

**Por que existe:** `initialize` não exige autenticação — qualquer conta pode chamá-la. A única proteção contra reinicialização maliciosa é a verificação interna de `storage::has_admin`. Este teste garante que essa proteção funciona corretamente.

**Fluxo:**
1. Cria o contrato e um endereço de admin.
2. Chama `initialize` com o admin — deve retornar `Ok(())`.
3. Chama `try_initialize` novamente com o mesmo admin.
4. Verifica que o resultado é `Err(Ok(ContractError::AlreadyInitialized))`.

---

### `test_anchor_and_verify_flow`

```rust
#[test]
fn test_anchor_and_verify_flow()
```

**O que verifica:** o fluxo principal do contrato — ancorar um hash e verificá-lo em seguida — e que ancoragem duplicada é rejeitada.

**Por que existe:** é o caminho feliz central do sistema. Se `anchor_credential` não persistir o dado corretamente ou `verify_credential` não o recuperar, o contrato não tem valor.

**Fluxo:**
1. `env.mock_all_auths()` é chamado para simular a autorização sem uma chave real.
2. O contrato é criado e inicializado.
3. Um hash (seed `1`) é ancorado.
4. `verify_credential` é chamado e os campos `is_revoked = false` e `issuer = admin` são verificados.
5. Uma segunda tentativa de ancorar o mesmo hash via `try_anchor_credential` retorna `Err(Ok(ContractError::CredentialAlreadyExists))`.

---

### `test_verify_nonexistent_credential_fails`

```rust
#[test]
fn test_verify_nonexistent_credential_fails()
```

**O que verifica:** que `verify_credential` retorna `CredentialNotFound` para um hash que nunca foi ancorado.

**Por que existe:** garante que a função de consulta não retorna dados falsos para hashes inexistentes. Sem esse teste, uma regressão no storage poderia fazer `get_credential` retornar um valor default em vez do erro correto.

**Fluxo:**
1. O contrato é criado e inicializado.
2. `try_verify_credential` é chamado com um hash (seed `99`) que nunca foi ancorado.
3. Verifica que o resultado é `Err(Ok(ContractError::CredentialNotFound))`.

---

### `test_anchor_without_authorization_fails`

```rust
#[test]
fn test_anchor_without_authorization_fails()
```

**O que verifica:** que `anchor_credential` falha quando chamado sem a assinatura do admin, mesmo que o contrato esteja inicializado.

**Por que existe:** `require_auth` é o mecanismo de segurança central. Esse teste confirma que a proteção não pode ser contornada simplesmente chamando a função sem autorização.

**Fluxo:**
1. O contrato é criado.
2. `env.mock_all_auths()` é ativado temporariamente para que `initialize` funcione.
3. `env.set_auths(&[])` remove todas as autorizações simuladas.
4. Uma tentativa de ancorar via `try_anchor_credential` é feita sem autorização.
5. Verifica que o resultado é um erro (a forma exata do erro de host pode variar — o teste usa `assert!(result.is_err())`).

---

### `test_revoke_updates_status_without_deleting_history`

```rust
#[test]
fn test_revoke_updates_status_without_deleting_history()
```

**O que verifica:** dois comportamentos em conjunto — que revogar uma credencial atualiza `is_revoked` para `true` sem apagar o registro, e que tentar revogar um hash inexistente retorna `CredentialNotFound`.

**Por que existe:** a proposta de valor do contrato inclui a garantia de que provas de existência são permanentes. Se `revoke_credential` apagasse o registro, um verificador poderia concluir erroneamente que a credencial nunca existiu. O teste garante que o registro permanece consultável após a revogação.

**Fluxo:**
1. O contrato é criado, inicializado, e um hash (seed `3`) é ancorado.
2. `revoke_credential` é chamado com o hash e o motivo `"Fraude detectada na instituicao parceira"`.
3. `verify_credential` é chamado e `is_revoked = true` e `issuer = admin` são verificados.
4. Uma tentativa de revogar um hash inexistente (seed `200`) via `try_revoke_credential` retorna `Err(Ok(ContractError::CredentialNotFound))`.

---

### `test_transfer_admin_and_old_admin_loses_privileges`

```rust
#[test]
fn test_transfer_admin_and_old_admin_loses_privileges()
```

**O que verifica:** que após `transfer_admin`, o novo admin é reconhecido como emissor em novas credenciais, e que operações sem autorização falham após a remoção das autorizações simuladas.

**Por que existe:** a transferência de custódia é uma operação crítica de segurança. Esse teste confirma dois aspectos: (1) o novo admin é registrado corretamente como `issuer` em novas ancoragens, e (2) operações sem autorização válida são bloqueadas.

**Fluxo:**
1. O contrato é criado com `old_admin` e `transfer_admin` é chamado para `new_admin`.
2. Um hash (seed `4`) é ancorado — com `mock_all_auths` ativo.
3. `verify_credential` confirma que `credential.issuer == new_admin`.
4. `env.set_auths(&[])` remove todas as autorizações simuladas.
5. Uma tentativa de ancorar um novo hash (seed `5`) via `try_anchor_credential` falha.
6. `assert_ne!(old_admin, new_admin)` confirma que os dois endereços são de fato diferentes (sanidade).

---

## Observações sobre `mock_all_auths` e `set_auths`

- `env.mock_all_auths()`: substitui o mecanismo de `require_auth` por uma simulação que aprova qualquer solicitação de autorização. Usado para testar o comportamento do contrato sem precisar de chaves reais.
- `env.set_auths(&[])`: remove todas as autorizações simuladas, fazendo com que qualquer `require_auth` subsequente falhe.

Essas funções são parte da feature `testutils` do Soroban SDK e não existem no binário de produção.
