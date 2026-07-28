import { z } from 'zod'

const envSchema = z.object({
  // Servidor
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // Banco de dados
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET deve ter ao menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // OTP
  OTP_TTL_MINUTES: z.coerce.number().default(10),
  OTP_MAX_ATTEMPTS: z.coerce.number().default(3),

  // Uploads
  UPLOADS_DIR: z.string().default('./uploads'),

  // Stellar / Soroban
  STELLAR_NETWORK: z.enum(['testnet', 'mainnet']).default('testnet'),
  STELLAR_RPC_URL: z.string().url('STELLAR_RPC_URL deve ser uma URL válida'),
  STELLAR_NETWORK_PASSPHRASE: z.string().min(1),
  ELOCIV_CONTRACT_ID: z.string().min(1, 'ELOCIV_CONTRACT_ID é obrigatório'),
  ELOCIV_ISSUER_PUBLIC_KEY: z.string().min(1, 'ELOCIV_ISSUER_PUBLIC_KEY é obrigatório'),
  ELOCIV_ISSUER_SECRET_KEY: z.string().min(1, 'ELOCIV_ISSUER_SECRET_KEY é obrigatório'),
})

function loadConfig() {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('Erro nas variáveis de ambiente:')
    console.error(result.error.flatten().fieldErrors)
    process.exit(1)
  }

  return result.data
}

export const config = loadConfig()
export type Config = typeof config
