# Storage e Dados

## A Struct `Credential`

Definida em `contracts/elociv-registry/src/types.rs`, a struct `Credential` é o único tipo de dado armazenado on-chain por este contrato:

```rust
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Credential {
    pub timestamp: u64,
    pub is_revoked: bool,
    pub issuer: Address,
}
```

A anotação `#[contracttype]` instrui o Soroban SDK a serializar e desserializar automaticamente esse tipo no formato XDR, que é o protocolo de codificação binária da Stellar. Isso garante que os dados possam ser lidos por qualquer cliente que conheça a ABI do contrato, independente da linguagem de programação usada.

### Campos

| Campo      | Tipo    | Descrição                                                                 |
|------------|---------|---------------------------------------------------------------------------|
| timestamp  | u64     | Timestamp do ledger (em segundos, Unix epoch) no momento da ancoragem     |
| is_revoked | bool    | `false` ao ser ancorada; `true` após uma chamada a `revoke_credential`    |
| issuer     | Address | Endereço Stellar do admin que executou a ancoragem                        |

### O que não está na struct

O hash SHA-256 em si não é um campo da struct. O hash é a chave do registro no Persistent Storage. Isso significa que o hash é o índice de busca e não precisa ser armazenado dentro do valor.

Nenhum dado pessoal faz parte da struct. A decisão de design é explicitada no comentário do código-fonte:

```
// Privacy by design: nenhum dado pessoal (nome, e-mail, etc.) é
// armazenado aqui. Apenas o hash (usado como chave no storage) e
// metadados mínimos de prova de existência/integridade.
```

---

## Instance Storage vs Persistent Storage

O Soroban SDK oferece três tipos de storage para contratos: `instance`, `persistent` e `temporary`. Este contrato usa os dois primeiros.

### Instance Storage — endereço do admin

```rust
env.storage().instance().set(&ADMIN_KEY, admin);
env.storage().instance().get(&ADMIN_KEY)
```

O Instance Storage armazena dados associados ao ciclo de vida da instância do contrato. Quando o contrato é arquivado (expirado por falta de TTL), todos os dados do Instance Storage são arquivados juntos.

O endereço do admin é armazenado aqui porque:

- É um dado único e pequeno — existe apenas um admin por vez.
- Seu tempo de vida é logicamente vinculado ao contrato em si: se o contrato expirar, o admin também deixa de ter sentido.
- Operações no Instance Storage têm custo menor do que no Persistent Storage para dados únicos.

A chave usada é `ADMIN_KEY`, definida como:

```rust
const ADMIN_KEY: Symbol = symbol_short!("ADMIN");
```

### Persistent Storage — credenciais

```rust
env.storage().persistent().set(hash, credential);
env.storage().persistent().get(hash)
```

O Persistent Storage armazena dados com chave-valor onde cada entrada tem seu próprio TTL independente. Dados nesse storage sobrevivem ao arquivamento do contrato (desde que sua própria entrada tenha TTL vigente).

As credenciais são armazenadas aqui porque:

- São provas de existência que, por natureza, devem ser permanentes.
- Cada credencial é uma entrada independente, identificada pelo hash.
- O TTL de cada credencial pode ser estendido individualmente, sem afetar outras entradas.

---

## TTL e Extensão de Tempo de Vida

O Soroban Storage opera com TTL medido em número de ledgers. Entradas sem TTL vigente são arquivadas e ficam inacessíveis (mas não são deletadas permanentemente — podem ser restauradas). As constantes de TTL estão definidas em `storage.rs`:

### Instance Storage (admin)

```rust
const INSTANCE_TTL_THRESHOLD: u32 = 100_000;
const INSTANCE_TTL_EXTEND_TO: u32 = 100_000;
```

A cada escrita no Instance Storage (via `set_admin`), o TTL é estendido para 100.000 ledgers a partir do ledger atual. Isso representa aproximadamente 578 dias (a uma média de 5 segundos por ledger).

### Persistent Storage (credenciais)

```rust
const CREDENTIAL_TTL_THRESHOLD: u32 = 500_000;
const CREDENTIAL_TTL_EXTEND_TO: u32 = 500_000;
```

A cada escrita de credencial (via `set_credential`, chamada tanto em `anchor_credential` quanto em `revoke_credential`), o TTL da entrada é estendido para 500.000 ledgers. Isso representa aproximadamente 2.893 dias (~7,9 anos).

A semântica do `extend_ttl` é: "se o TTL atual for menor que `THRESHOLD`, estenda para `EXTEND_TO`". Se o TTL atual ainda for maior que `THRESHOLD`, a chamada não tem efeito (não é um custo desperdiçado).

### Por que o TTL de credenciais é maior

Credenciais são provas de existência. A razão social do contrato é garantir que um hash existia em um determinado momento. Portanto, o TTL das credenciais deve ser significativamente maior do que o do dado administrativo. Em um sistema de produção em mainnet, o backend deve monitorar o TTL das credenciais e renovar proativamente as entradas cujo TTL esteja próximo do threshold.

---

## Funções de Storage em `storage.rs`

Todas as interações com o storage do Soroban passam pelas funções em `storage.rs`, que encapsulam a lógica de TTL e centralizam as chaves.

| Função           | Storage     | Operação                                               |
|------------------|-------------|--------------------------------------------------------|
| `has_admin`      | Instance    | Verifica se o admin foi configurado                    |
| `set_admin`      | Instance    | Grava o endereço do admin e estende TTL                |
| `get_admin`      | Instance    | Lê o endereço do admin ou retorna `NotAuthorized`      |
| `has_credential` | Persistent  | Verifica se já existe credencial para um dado hash     |
| `get_credential` | Persistent  | Lê a struct `Credential` ou retorna `CredentialNotFound` |
| `set_credential` | Persistent  | Grava ou atualiza uma credencial e estende seu TTL     |
