# Ambiente de Desenvolvimento

Este documento descreve como configurar o ambiente do zero para desenvolver, testar e compilar o smart contract EloCiv.

## Versões utilizadas neste projeto

| Ferramenta       | Versão usada          |
|------------------|-----------------------|
| soroban-sdk      | 21.7.7                |
| Rust (recomendado)| 1.81.0 ou superior   |
| target wasm32    | wasm32-unknown-unknown |
| Stellar CLI      | 21.x ou compatível com soroban-sdk 21.x |
| Cargo edition    | 2021                  |

A versão do `soroban-sdk` está fixada no `Cargo.toml` da raiz do workspace em `21.7.7`. O Stellar CLI deve ser compatível com essa versão do SDK para que os tipos XDR sejam interpretados corretamente.

---

## 1. Instalar Rust

Se o Rust não estiver instalado, use o instalador oficial `rustup`:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Após a instalação, recarregue o ambiente de shell:

```bash
source "$HOME/.cargo/env"
```

Verifique a instalação:

```bash
rustc --version
cargo --version
```

---

## 2. Adicionar o target WebAssembly

O Soroban compila contratos para WebAssembly. O target `wasm32-unknown-unknown` deve estar instalado:

```bash
rustup target add wasm32-unknown-unknown
```

Verifique se o target está instalado:

```bash
rustup target list --installed
```

A linha `wasm32-unknown-unknown (installed)` deve aparecer na saída.

---

## 3. Instalar o Stellar CLI

O Stellar CLI é a ferramenta oficial para interagir com a rede Stellar via terminal: deploy de contratos, invocação de funções, gerenciamento de identidades e consultas de storage.

A forma mais direta de instalar é via `cargo install`:

```bash
cargo install --locked stellar-cli --features opt
```

A flag `--locked` garante que as versões de dependências do lockfile do Stellar CLI sejam respeitadas, evitando incompatibilidades. A feature `opt` inclui otimizações adicionais.

Verifique a instalação:

```bash
stellar --version
```

Alternativas de instalação (homebrew no macOS, pacotes de distribuição Linux) estão documentadas em https://developers.stellar.org/docs/tools/stellar-cli.

---

## 4. Clonar o repositório

```bash
git clone git@github.com:josiasdev/Elo.git
cd Elo
```

---

## 5. Verificar o ambiente

Execute o seguinte para confirmar que o Cargo enxerga o workspace corretamente:

```bash
cargo check --workspace
```

O resultado esperado é uma série de linhas `Compiling ...` seguidas de `Finished`. Nenhum erro deve ser exibido.

---

## Estrutura de Features

A crate do contrato define uma feature `testutils` em `Cargo.toml`:

```toml
[dev-dependencies]
soroban-sdk = { workspace = true, features = ["testutils"] }

[features]
testutils = ["soroban-sdk/testutils"]
```

A feature `testutils` ativa funcionalidades do Soroban SDK que existem apenas em ambiente de teste, como `mock_all_auths` e `set_auths`. Essas funções não existem no binário wasm de produção — são removidas pelo compilador quando a feature não está ativa. Os testes são executados automaticamente com essa feature ativada pelas dev-dependencies.

---

## Notas sobre Compatibilidade

- O `soroban-sdk` na versão `21.7.7` corresponde à série de protocolo Stellar 21. O Stellar CLI a ser usado para deploy e invocação deve suportar o protocolo 21.
- O perfil `release` do workspace (`Cargo.toml` raiz) usa `opt-level = "z"` e `lto = true`. Esses parâmetros aumentam o tempo de compilação mas produzem um arquivo wasm menor e mais barato de deploy e execução.
- O perfil `release-with-logs` herda de `release` e ativa `debug-assertions = true`. Use-o quando quiser preservar mensagens de log durante depuração, sem perder as otimizações de tamanho do wasm.
