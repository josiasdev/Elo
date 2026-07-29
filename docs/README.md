# Documentação Técnica — EloCiv

Este diretório contém a documentação técnica completa do projeto **EloCiv**, desenvolvido para o *UNICEF Youth Challenge Blockchain 2026*.

Todo o conteúdo está em português do Brasil e organizado em subpastas por módulo do sistema:

---

## 📂 Módulos de Documentação

### 1. Smart Contract (Soroban / Rust) — [`docs/smart-contract/`](./smart-contract/README.md)
Documentação técnica do contrato inteligente `elociv-registry` na blockchain Stellar.

- [`smart-contract/README.md`](./smart-contract/README.md) — Índice geral da documentação do smart contract.
- [`00-visao-geral.md`](./smart-contract/00-visao-geral.md) — Visão geral e arquitetura de privacidade.
- [`01-estrutura-do-projeto.md`](./smart-contract/01-estrutura-do-projeto.md) — Árvore do projeto e módulos Rust.
- [`02-smart-contract.md`](./smart-contract/02-smart-contract.md) — Especificação das funções do contrato.
- [`03-storage-e-dados.md`](./smart-contract/03-storage-e-dados.md) — Storage (Instance/Persistent) e políticas de TTL.
- [`04-erros.md`](./smart-contract/04-erros.md) — Enums de erro `ContractError` e códigos HTTP.
- [`05-ambiente-de-desenvolvimento.md`](./smart-contract/05-ambiente-de-desenvolvimento.md) — Setup de Rust, WASM e Stellar CLI.
- [`06-testes.md`](./smart-contract/06-testes.md) — Suíte de testes unitários em Rust.
- [`07-build-e-deploy.md`](./smart-contract/07-build-e-deploy.md) — Compilação e deploy na Stellar Testnet.
- [`08-comandos-cli-invoke.md`](./smart-contract/08-comandos-cli-invoke.md) — Comandos Stellar CLI para invocação.
- [`09-integracao-backend.md`](./smart-contract/09-integracao-backend.md) — Guia de integração backend-contrato.

---

### 2. Backend Node.js (Fastify + Prisma) — [`docs/backend/`](./backend/README.md)
Documentação técnica do servidor backend off-chain e serviço de custodiante.

- [`backend/README.md`](./backend/README.md) — Índice geral da documentação do backend.
- [`10-backend-visao-geral.md`](./backend/10-backend-visao-geral.md) — Visão geral da arquitetura do backend.
- [`11-backend-estrutura-e-modulos.md`](./backend/11-backend-estrutura-e-modulos.md) — Árvore de diretórios e módulos do backend.
- [`12-backend-modelo-de-dados.md`](./backend/12-backend-modelo-de-dados.md) — Schema Prisma e PostgreSQL.
- [`13-backend-apis.md`](./backend/13-backend-apis.md) — Documentação dos endpoints REST.
- [`14-backend-integracao-stellar.md`](./backend/14-backend-integracao-stellar.md) — Integração Stellar/Soroban e hashes SHA-256.
- [`15-backend-execucao-e-seed.md`](./backend/15-backend-execucao-e-seed.md) — Setup, migrações, seeds e testes.

---

## 📊 Status de Implementação

| Componente                  | Status           |
|-----------------------------|------------------|
| Smart contract Soroban      | Implementado     |
| Testes unitários do contrato| Implementados    |
| Deploy na Testnet           | A fazer          |
| Backend Node.js (Fastify)   | Implementado     |
| Testes do Backend (Vitest)  | Implementados    |
| Frontend React              | Planejado        |
