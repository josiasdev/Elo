# Estrutura do Projeto

## Árvore de Diretórios

```
Elo/
├── Cargo.toml                          # Workspace Cargo: define membros e dependências compartilhadas
├── Cargo.lock                          # Lockfile gerado automaticamente pelo Cargo
├── README.md                           # Visão geral do projeto (contexto do hackathon)
├── .env                                # Variáveis de ambiente locais (não versionado em produção)
└── contracts/
    └── elociv-registry/
        ├── Cargo.toml                  # Manifesto do crate do contrato
        └── src/
            ├── lib.rs                  # Ponto de entrada da crate; declara módulos e reexporta símbolos públicos
            ├── contract.rs             # Implementação das funções públicas do contrato
            ├── types.rs                # Definição da struct Credential
            ├── storage.rs              # Funções de leitura e escrita no storage (Instance e Persistent)
            ├── errors.rs               # Enum ContractError com todos os erros possíveis
            └── test.rs                 # Testes unitários com o ambiente de simulação do Soroban SDK
```

Existe também o diretório `contracts/elociv-registry/test_snapshots/`, gerado automaticamente pelo framework de testes do Soroban SDK para snapshots de estado, e o diretório `target/`, gerado pelo Cargo durante a compilação.

## Workspace Cargo (`Cargo.toml` raiz)

```toml
[workspace]
resolver = "2"
members = [
    "contracts/elociv-registry",
]

[workspace.dependencies]
soroban-sdk = "21.7.7"
```

O arquivo define um workspace Cargo com um único membro: o crate `elociv-registry`. A dependência do `soroban-sdk` na versão `21.7.7` é declarada no workspace e referenciada pelo crate do contrato via `{ workspace = true }`. Isso garante que a versão seja consistente em todo o projeto.

O arquivo também define dois perfis de compilação:

- `release`: perfil otimizado para wasm pequeno. Usa `opt-level = "z"` (otimização de tamanho), `lto = true` (link-time optimization), `codegen-units = 1` e `panic = "abort"`. Produz o artefato wasm a ser deployed.
- `release-with-logs`: herda de `release`, mas ativa `debug-assertions = true`. Útil para depuração com eventos de log preservados.

## Manifesto do Contrato (`contracts/elociv-registry/Cargo.toml`)

```toml
[package]
name = "elociv-registry"
version = "0.1.0"
edition = "2021"
publish = false

[lib]
crate-type = ["cdylib", "rlib"]
doctest = false
```

O crate é compilado como dois tipos de library:

- `cdylib`: produz o arquivo `.wasm` deployável na Stellar. É o artefato que o Stellar CLI carrega para a rede.
- `rlib`: permite que o crate seja usado como biblioteca Rust. Necessário para que os testes unitários (`test.rs`) possam importar os tipos e o cliente do contrato.

A feature `testutils` ativa funcionalidades extras do `soroban-sdk` que só devem existir em ambiente de teste (como `mock_all_auths` e `set_auths`).

## Módulos do Código-Fonte

### `lib.rs` — Ponto de Entrada da Crate

Declara todos os módulos internos e reexporta os símbolos que o Soroban SDK e os consumidores externos precisam enxergar:

```rust
pub use contract::{EloCivContract, EloCivContractClient};
pub use errors::ContractError;
pub use types::Credential;
```

O atributo `#![no_std]` indica que a crate não usa a biblioteca padrão do Rust (`std`), requisito obrigatório para contratos Soroban, que são compilados para WebAssembly com um ambiente de execução restrito.

### `contract.rs` — Implementação do Contrato

Contém a struct `EloCivContract` anotada com `#[contract]` e seu bloco `#[contractimpl]` com as cinco funções públicas do contrato:

- `initialize`
- `anchor_credential`
- `verify_credential`
- `revoke_credential`
- `transfer_admin`

Cada função delega as operações de storage para o módulo `storage` e emite eventos via `env.events().publish(...)`. Consulte `docs/02-smart-contract.md` para a documentação detalhada de cada função.

### `types.rs` — Tipos de Dados

Define a struct `Credential` anotada com `#[contracttype]`, que é o único tipo de dado armazenado on-chain por este contrato:

```rust
pub struct Credential {
    pub timestamp: u64,
    pub is_revoked: bool,
    pub issuer: Address,
}
```

A anotação `#[contracttype]` instrui o Soroban SDK a serializar e desserializar automaticamente esse tipo no formato XDR compatível com a blockchain. Consulte `docs/03-storage-e-dados.md` para mais detalhes.

### `storage.rs` — Camada de Persistência

Encapsula toda a comunicação com o storage da Stellar. Separa claramente as operações de Instance Storage (para o endereço do admin) e Persistent Storage (para as credenciais). Também define as constantes de TTL (time-to-live) para cada tipo de dado. Consulte `docs/03-storage-e-dados.md`.

### `errors.rs` — Erros do Contrato

Define o enum `ContractError` com todos os erros que as funções do contrato podem retornar. A anotação `#[contracterror]` faz com que cada variante seja convertida para um código numérico `u32` que trafega na resposta da transação. Consulte `docs/04-erros.md`.

### `test.rs` — Testes Unitários

Contém seis funções de teste que verificam o comportamento esperado do contrato usando o ambiente de simulação do Soroban SDK. Consulte `docs/06-testes.md` para a descrição detalhada de cada teste.
