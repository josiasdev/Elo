# Visão Geral do Backend EloCiv

## O papel do Backend no Ecossistema

O backend da plataforma EloCiv foi projetado em **Node.js com Fastify e TypeScript** para gerenciar a camada operacional off-chain do sistema. Suas principais atribuições são:

1. **Gestão Operacional**: Cadastros mínimos de adolescentes, onboarding e verificação de instituições parceiras (ONGs, escolas, poder público), publicação e busca de oportunidades e gestão do ciclo de vida das participações.
2. **Camada de Autenticação**: Autenticação via OTP (One-Time Password) por e-mail para jovens e usuários institucionais, gerando tokens JWT estruturados com controle de acesso baseado em papéis (RBAC).
3. **Emissor Técnico Custodiante**: O backend atua como o custodiante da carteira Stellar do projeto. Ao confirmar uma participação, a API constrói a Verifiable Credential (VC), calcula a representação canônica do hash SHA-256 e interage diretamente com a rede Stellar Soroban utilizando a chave secreta da aplicação.
4. **Agregação Territorial e Analytics**: Consolidação de indicadores por município (usando o catálogo oficial do IBGE) para visualização de densidade de oportunidades e identificação de desertos territoriais.

## Arquitetura de Camadas

```
[ Frontend React / Vite ] (Aplicações de Clientes)
        |
        v REST / JSON (HTTPS + JWT)
[ Backend Fastify ]
    ├── Autenticação & OTP (Mock/Pino)
    ├── Validação & Schemas (Zod)
    ├── ORM & Persistência (Prisma / PostgreSQL)
    └── Serviços de Integração
            ├── Credential Engine (SHA-256 Canônico / VC W3C)
            └── Stellar Soroban Client (@stellar/stellar-sdk)
                    |
                    v RPC (HTTPS)
[ Rede Stellar / Smart Contract elociv-registry ]
```

## Stack Tecnológica

- **Runtime**: Node.js v24+
- **Framework Web**: Fastify v5 (alta performance, tipagem nativa e ecossistema de plugins)
- **Linguagem**: TypeScript v5 (modo estrito ativo)
- **Banco de Dados & ORM**: PostgreSQL com Prisma ORM v6
- **Autenticação**: `@fastify/jwt` + OTP via e-mail (mockado em console log para o MVP)
- **Validação de Entrada**: Zod v3
- **Upload de Arquivos**: `@fastify/multipart` (armazenamento local privado na pasta `backend/uploads/` para o MVP)
- **Blockchain Integration**: `@stellar/stellar-sdk` v13 (RPC client, TransactionBuilder e chamadas Soroban)
- **Testes**: Vitest v3

## Princípios Arquiteturais e Segurança

- **Privacy by Design**: Nenhum dado pessoal identificável (PII) é enviado ao smart contract. O hash ancordo é gerado estritamente sobre dados de contexto da credencial (título, tipo, ODS, município, datas e issuer).
- **Modelo de Custodiante Único**: A chave privada Stellar (`ELOCIV_ISSUER_SECRET_KEY`) permanece isolada no ambiente seguro do backend. As instituições parceiras interagem exclusivamente via API autenticada sem precisar gerenciar carteiras Web3.
- **Fail-Safe para Ancoragem**: Caso a rede Stellar esteja fora do ar ou o RPC falhe, o registro da credencial no banco de dados recebe o status `PENDENTE_ANCORAGEM`, permitindo reprocessamento via rota administrativa sem perda dos dados operacionais.
