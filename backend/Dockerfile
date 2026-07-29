# Estágio de build
FROM node:24-alpine AS builder

WORKDIR /app

# Copia manifestos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala todas as dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Gera o client do Prisma e realiza o build do TypeScript
RUN npm run db:generate
RUN npm run build

# Estágio de produção
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY prisma ./prisma/

# Instala apenas dependências de produção
RUN npm ci --only=production

# Copia arquivos compilados e artefatos do Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Garante pasta de uploads
RUN mkdir -p uploads

EXPOSE 3000

CMD ["node", "dist/server.js"]
