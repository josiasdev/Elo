# Documentação Técnica do Backend Node.js — EloCiv

Esta pasta contém a documentação técnica completa do backend Node.js (Fastify, TypeScript, Prisma, PostgreSQL) do projeto **EloCiv**, desenvolvido para o *UNICEF Youth Challenge Blockchain 2026*.

O backend atua como a camada operacional off-chain do sistema e como o **emissor técnico único (custodiante)** que assina e submete transações ao smart contract Soroban (`elociv-registry`) na blockchain Stellar.

---

## Estrutura da Documentação

A documentação está dividida em arquivos Markdown específicos por assunto:

| Arquivo | Descrição |
|---|---|
| [`10-backend-visao-geral.md`](./10-backend-visao-geral.md) | Visão geral da arquitetura do backend, papel do custodiante único, stack tecnológica e princípios de privacy by design. |
| [`11-backend-estrutura-e-modulos.md`](./11-backend-estrutura-e-modulos.md) | Árvore de diretórios do código em `backend/`, responsabilidade de cada arquivo e descrição dos 10 módulos funcionais. |
| [`12-backend-modelo-de-dados.md`](./12-backend-modelo-de-dados.md) | Especificação técnica do schema Prisma, tabelas PostgreSQL, tipos de dados, enums e o catálogo territorial IBGE. |
| [`13-backend-apis.md`](./13-backend-apis.md) | Documentação completa de todos os endpoints REST (contrato de API, parâmetros, autenticação, payloads de requisição/resposta e códigos HTTP). |
| [`14-backend-integracao-stellar.md`](./14-backend-integracao-stellar.md) | Detalhamento do serviço de integração com a Stellar/Soroban: montagem de transação, cálculo do hash SHA-256 canônico, emissão de VC, tratamento de falhas e mapeamento de `ContractError`. |
| [`15-backend-execucao-e-seed.md`](./15-backend-execucao-e-seed.md) | Guia passo a passo para configurar o ambiente, variáveis de ambiente, executar migrações do Prisma, rodar o script de seed dos institutos piloto (IPOM e Filadélfia) e executar o projeto/testes. |

---

## Regras de Design e Privacidade (Privacy by Design)

1. **Nenhum dado pessoal em blockchain**: O contrato Soroban recebe exclusivamente o hash SHA-256 de 32 bytes das credenciais. Nome do jovem, e-mail e documento nunca são enviados on-chain.
2. **Minimização de dados institucionais**: As instituições parceiras não possuem acesso à base completa de jovens. Ao receber uma manifestação de interesse em uma oportunidade, a instituição enxerga apenas o e-mail do jovem e sua faixa etária.
3. **Custodiante Único**: O backend guarda a chave privada da conta custodiante da Stellar (`ELOCIV_ISSUER_SECRET_KEY`) e assina todas as transações em nome das instituições.
