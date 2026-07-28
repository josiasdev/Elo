# Documentação Técnica — EloCiv Smart Contract

Este diretório contém a documentação técnica completa do smart contract `elociv-registry`, escrito em Rust com o Soroban SDK para a blockchain Stellar, assim como a documentação do backend Node.js.

Todo o conteúdo está em português do Brasil e organizado por assunto em arquivos separados.

---

## Índice — Smart Contract (Soroban / Rust)

### [00-visao-geral.md](./00-visao-geral.md)

O que é o EloCiv, qual problema resolve, arquitetura geral do sistema (instituições parceiras -> backend -> contrato -> Stellar), o modelo de custodiante único e o princípio de privacy by design (nenhum dado pessoal armazenado on-chain).

---

### [01-estrutura-do-projeto.md](./01-estrutura-do-projeto.md)

Árvore de diretórios do repositório com a descrição da responsabilidade de cada arquivo: o workspace Cargo, o manifesto do contrato (`Cargo.toml`), e cada módulo Rust separado (`lib.rs`, `contract.rs`, `types.rs`, `storage.rs`, `errors.rs`, `test.rs`).

---

### [02-smart-contract.md](./02-smart-contract.md)

Documentação detalhada de cada uma das cinco funções públicas do contrato:

- `initialize` — configura o admin inicial (só pode ser chamada uma vez)
- `anchor_credential` — registra um hash SHA-256 como prova de existência
- `verify_credential` — consulta os dados de uma credencial pelo hash
- `revoke_credential` — marca uma credencial como revogada sem apagar o histórico
- `transfer_admin` — transfere a custódia do contrato para um novo endereço

Para cada função: parâmetros, retorno, autorização exigida, eventos emitidos e erros possíveis.

---

### [03-storage-e-dados.md](./03-storage-e-dados.md)

A struct `Credential` e seus campos. A diferença entre Instance Storage (usado para o endereço do admin) e Persistent Storage (usado para as credenciais). A política de TTL (time-to-live) para cada tipo de dado e o motivo pelo qual o TTL de credenciais é significativamente maior.

---

### [04-erros.md](./04-erros.md)

Tabela completa do enum `ContractError` com os quatro erros possíveis, seus valores numéricos `u32` e o mapeamento sugerido para códigos HTTP (para consumo via backend Node.js). Inclui observação sobre a diferença entre erros de contrato e erros de host do Soroban.

---

### [05-ambiente-de-desenvolvimento.md](./05-ambiente-de-desenvolvimento.md)

Passo a passo para configurar o ambiente do zero: instalar Rust, adicionar o target `wasm32-unknown-unknown`, instalar o Stellar CLI. Inclui as versões usadas neste projeto (soroban-sdk 21.7.7) e notas sobre o sistema de features (`testutils`).

---

### [06-testes.md](./06-testes.md)

Como executar os testes unitários com `cargo test`. Descrição de cada um dos seis testes em `test.rs`: o que cada um verifica, por que existe e o fluxo de execução. Inclui explicação das funções `mock_all_auths` e `set_auths` do Soroban SDK de testes.

---

### [07-build-e-deploy.md](./07-build-e-deploy.md)

Processo completo de build e deploy na Stellar Testnet: compilar o wasm com `stellar contract build`, criar e financiar uma identidade local, fazer o deploy com `stellar contract deploy`, inicializar o contrato e armazenar o `CONTRACT_ID`.

---

### [08-comandos-cli-invoke.md](./08-comandos-cli-invoke.md)

Referência de todos os comandos do Stellar CLI para invocar cada função do contrato, com exemplos reais de uso e o resultado esperado. Inclui fluxos de teste manual completos: revogar uma credencial e confirmar que o histórico persiste; transferir o admin e confirmar que o admin antigo perde privilégios imediatamente.

---

### [09-integracao-backend.md](./09-integracao-backend.md)

Guia de integração planejada com o backend Node.js (Fastify/Express): quem assina as transações (custodiante único), como gerar o hash SHA-256 off-chain, como mapear os `ContractError` para respostas HTTP e o que nunca deve ser enviado ao contrato. Inclui proposta de rotas da API e bibliotecas recomendadas.

---

## Índice — Backend Node.js (Fastify + Prisma)

Toda a documentação técnica detalhada do backend encontra-se organizada na subpasta [`docs/backend/`](./backend/README.md):

- [`backend/README.md`](./backend/README.md) — Apresentação e índice da documentação do backend.
- [`backend/10-backend-visao-geral.md`](./backend/10-backend-visao-geral.md) — Visão geral da arquitetura, stack tecnológica e privacidade.
- [`backend/11-backend-estrutura-e-modulos.md`](./backend/11-backend-estrutura-e-modulos.md) — Árvore do projeto backend e os 10 módulos.
- [`backend/12-backend-modelo-de-dados.md`](./backend/12-backend-modelo-de-dados.md) — Especificação técnica do schema Prisma / PostgreSQL.
- [`backend/13-backend-apis.md`](./backend/13-backend-apis.md) — Documentação dos endpoints REST.
- [`backend/14-backend-integracao-stellar.md`](./backend/14-backend-integracao-stellar.md) — Integração com a Stellar/Soroban e algoritmo SHA-256.
- [`backend/15-backend-execucao-e-seed.md`](./backend/15-backend-execucao-e-seed.md) — Guia de configuração, migrações, seeds e testes.

---

## Status de Implementação

| Componente                  | Status           |
|-----------------------------|------------------|
| Smart contract Soroban      | Implementado     |
| Testes unitários do contrato| Implementados    |
| Deploy na Testnet           | A fazer          |
| Backend Node.js (Fastify)   | Implementado     |
| Testes do Backend (Vitest)  | Implementados    |
| Frontend React              | Planejado        |
