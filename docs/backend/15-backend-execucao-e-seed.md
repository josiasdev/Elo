# Execução, Configuração e Seeds

Este guia descreve as instruções para preparar o ambiente de desenvolvimento, configurar as variáveis de ambiente, executar as migrações do banco de dados, popular dados iniciais e rodar os testes.

---

## Pré-requisitos

1. **Node.js**: Versão v24.x instalada (verificada no ambiente: v24.14.1).
2. **PostgreSQL**: Instância ativa do PostgreSQL rodando localmente ou via Docker (porta padrão `5432`).
3. **Smart Contract de Deploy**: Instância do contrato `elociv-registry` deployado na Stellar Testnet (ver `docs/07-build-e-deploy.md`).

---

## Passo 1 — Instalação de Dependências

Navegue até o diretório do backend e instale as dependências com npm:

```bash
cd backend
npm install
```

---

## Passo 2 — Variáveis de Ambiente

Crie o arquivo `.env` no diretório `backend/` copiando o modelo `.env.example`:

```bash
cp .env.example .env
```

Preencha o `.env` com os dados da sua instância PostgreSQL e da chave da Stellar:

```env
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
LOG_LEVEL=info

# PostgreSQL Connection String
DATABASE_URL="postgresql://usuario:senha@localhost:5432/elociv_db?schema=public"

# JWT Secret (mínimo 32 caracteres)
JWT_SECRET="troque-por-um-segredo-forte-com-mais-de-32-caracteres"
JWT_EXPIRES_IN=7d

OTP_TTL_MINUTES=10
OTP_MAX_ATTEMPTS=3
UPLOADS_DIR=./uploads

# Configurações da Stellar Testnet
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

# CONTRACT_ID e chaves obtidos no deploy do contrato inteligente
ELOCIV_CONTRACT_ID="C..."
ELOCIV_ISSUER_PUBLIC_KEY="G..."
ELOCIV_ISSUER_SECRET_KEY="S..."
```

---

## Passo 3 — Migrações e Geração do Prisma Client

Execute as migrações do Prisma para criar a estrutura de tabelas no PostgreSQL:

```bash
npx prisma migrate dev --name init
```

Este comando também executará automaticamente o `prisma generate` para construir o cliente TypeScript fortemente tipado do Prisma.

---

## Passo 4 — Execução do Script de Seed

O projeto fornece um script completo em `backend/prisma/seed.ts` que executa:

1. **Importação IBGE**: Consome a API de localidades do IBGE e insere todos os 5.570 municípios do Brasil em lotes no banco.
2. **Institutos Piloto**: Cadastra os dois institutos pilotos com status `APROVADA` (prontos para criar oportunidades sem precisar passar pela fila manual):
   - **Instituto Povo do Mar (IPOM)** (Fortaleza/CE - IBGE 2304400).
   - **Instituto Filadélfia da Amazônia** (Manaus/AM - CNPJ 31.767.100/0001-71 - IBGE 1302603).
3. **Admin Master**: Cria o usuário administrador `admin@elociv.org`.

Para rodar o seed:

```bash
npx prisma db seed
```

---

## Passo 5 — Execução do Servidor em Desenvolvimento

Para iniciar o servidor com recarregamento automático (`tsx watch`):

```bash
npm run dev
```

O servidor estará acessível em: `http://localhost:3000`

Verifique a saúde do servidor via endpoint de Health Check:

```bash
curl http://localhost:3000/health
```

---

## Execução da Suíte de Testes

Os testes automatizados utilizam o **Vitest**. Para rodar a verificação de reprodutibilidade e canonicidade do hash SHA-256:

```bash
npm test
```

Para verificar a integridade de tipos do TypeScript sem emitir arquivos:

```bash
npx tsc --noEmit
```
