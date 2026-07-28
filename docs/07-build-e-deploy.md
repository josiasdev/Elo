# Build e Deploy

Este documento descreve o processo completo de compilação do contrato para WebAssembly e deploy na Stellar Testnet.

---

## Pré-requisitos

Antes de iniciar, certifique-se de que o ambiente está configurado conforme descrito em `docs/05-ambiente-de-desenvolvimento.md`:

- Rust instalado com o target `wasm32-unknown-unknown`
- Stellar CLI instalado e acessível no PATH
- Repositório clonado e na raiz do projeto (`Elo/`)

---

## 1. Compilar o Contrato

A compilação para WebAssembly usa o perfil `release`, que está configurado no `Cargo.toml` da raiz para produzir um wasm otimizado por tamanho.

Execute na raiz do workspace:

```bash
stellar contract build
```

Esse comando é o equivalente a:

```bash
cargo build --target wasm32-unknown-unknown --release --package elociv-registry
```

O Stellar CLI usa `stellar contract build` como wrapper conveniente que garante que as flags corretas sejam passadas ao Cargo.

O arquivo `.wasm` compilado será gerado em:

```
target/wasm32-unknown-unknown/release/elociv_registry.wasm
```

O nome do arquivo usa underscores em vez de hífens — comportamento padrão do Cargo ao converter o nome do pacote.

Para verificar que o arquivo foi gerado:

```bash
ls -lh target/wasm32-unknown-unknown/release/elociv_registry.wasm
```

---

## 2. Criar uma Identidade Local

O Stellar CLI usa identidades para assinar transações. Uma identidade é um par de chaves (pública/privada) armazenado localmente.

Crie a identidade do custodiante:

```bash
stellar keys generate admin --network testnet
```

Esse comando gera um par de chaves e associa o alias `admin` a ele. A chave privada é armazenada no diretório de configuração do Stellar CLI (geralmente `~/.config/stellar/`).

Para verificar o endereço público gerado:

```bash
stellar keys address admin
```

Anote o endereço exibido. Ele será referenciado como `ADMIN_ADDR` nos exemplos desta documentação.

Defina a variável de ambiente para uso nos comandos seguintes:

```bash
export ADMIN_ADDR=$(stellar keys address admin)
```

---

## 3. Financiar a Conta na Testnet

Contas na Stellar Testnet precisam ser financiadas antes de poderem assinar transações. Use o Friendbot, o serviço de faucet da testnet:

```bash
stellar keys fund admin --network testnet
```

O Stellar CLI faz a requisição ao Friendbot automaticamente para a conta associada ao alias `admin`. O resultado esperado é uma mensagem confirmando que a conta foi financiada com XLM de teste.

Verifique o saldo da conta:

```bash
stellar account show --network testnet $ADMIN_ADDR
```

---

## 4. Fazer o Deploy do Contrato

Com a conta financiada, faça o deploy do arquivo wasm na testnet:

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/elociv_registry.wasm \
  --source admin \
  --network testnet
```

O Stellar CLI envia o código wasm para a rede e retorna o `CONTRACT_ID` — um endereço que identifica unicamente a instância do contrato na blockchain. O `CONTRACT_ID` tem o formato de um endereço Stellar começando com `C`.

Armazene o `CONTRACT_ID` em uma variável de ambiente:

```bash
export CONTRACT_ID=<valor retornado pelo comando acima>
```

O `CONTRACT_ID` é necessário para todas as invocações subsequentes. Mantenha-o registrado de forma persistente (em um arquivo `.env`, por exemplo) para não precisar fazer novo deploy.

---

## 5. Inicializar o Contrato

Após o deploy, o contrato existe na rede mas ainda não tem um admin configurado. A função `initialize` deve ser chamada uma única vez para definir o custodiante:

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  initialize \
  --admin $ADMIN_ADDR
```

O resultado esperado é uma linha em branco ou `null`, indicando que `initialize` retornou `Ok(())` com sucesso.

Para confirmar que o contrato foi inicializado, tente inicializá-lo novamente. O contrato deve retornar o erro `AlreadyInitialized` (código 1):

```bash
stellar contract invoke \
  --id $CONTRACT_ID \
  --source admin \
  --network testnet \
  -- \
  initialize \
  --admin $ADMIN_ADDR
```

A saída deve conter uma indicação de erro com o código `1` (AlreadyInitialized).

---

## Resumo das Variáveis de Ambiente

Mantenha as seguintes variáveis definidas no seu ambiente ou em um arquivo `.env` para uso nos comandos de invocação documentados em `docs/08-comandos-cli-invoke.md`:

```bash
export ADMIN_ADDR=$(stellar keys address admin)
export CONTRACT_ID=<CONTRACT_ID retornado pelo deploy>
```

---

## Compilar com Logs (perfil release-with-logs)

Para compilar o contrato mantendo assertions de debug (útil durante desenvolvimento avançado), use o perfil `release-with-logs` definido no `Cargo.toml`:

```bash
cargo build \
  --target wasm32-unknown-unknown \
  --profile release-with-logs \
  --package elociv-registry
```

O arquivo wasm gerado estará em:

```
target/wasm32-unknown-unknown/release-with-logs/elociv_registry.wasm
```

Não use esse wasm em deploy de produção — o tamanho do artefato será maior e o comportamento em edge cases pode diferir do perfil `release` padrão.
