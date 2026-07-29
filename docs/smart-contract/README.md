# Documentação Técnica — Smart Contract (Soroban / Rust)

Esta pasta contém a documentação técnica detalhada do smart contract `elociv-registry`, desenvolvido em Rust utilizando o SDK Soroban para a blockchain Stellar.

---

## Estrutura da Documentação

| Arquivo | Descrição |
|---|---|
| [`00-visao-geral.md`](./00-visao-geral.md) | Visão geral do EloCiv, problema resolvido, arquitetura geral do sistema e modelo de privacidade. |
| [`01-estrutura-do-projeto.md`](./01-estrutura-do-projeto.md) | Árvore do projeto Rust/Soroban, estrutura de arquivos e responsabilidade dos módulos. |
| [`02-smart-contract.md`](./02-smart-contract.md) | Documentação detalhada das 5 funções públicas do contrato (`initialize`, `anchor_credential`, etc.). |
| [`03-storage-e-dados.md`](./03-storage-e-dados.md) | Modelo de dados, struct `Credential`, Instance vs Persistent Storage e políticas de TTL. |
| [`04-erros.md`](./04-erros.md) | Enum `ContractError`, códigos numéricos `u32` e mapeamento HTTP para o backend. |
| [`05-ambiente-de-desenvolvimento.md`](./05-ambiente-de-desenvolvimento.md) | Setup de ambiente: Rust, target `wasm32-unknown-unknown` e Stellar CLI. |
| [`06-testes.md`](./06-testes.md) | Execução e detalhes dos testes unitários com `cargo test` e `testutils`. |
| [`07-build-e-deploy.md`](./07-build-e-deploy.md) | Passo a passo de compilação WASM, deploy na Stellar Testnet e inicialização do contrato. |
| [`08-comandos-cli-invoke.md`](./08-comandos-cli-invoke.md) | Referência de comandos do Stellar CLI para invocação e testes manuais das funções do contrato. |
| [`09-integracao-backend.md`](./09-integracao-backend.md) | Guia de integração off-chain / on-chain com o backend Node.js. |
