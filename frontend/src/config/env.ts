import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default('http://localhost:3000'),
  VITE_USE_MOCKS: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
})

const parsedEnv = envSchema.parse(import.meta.env)

export const env = {
  apiBaseUrl: parsedEnv.VITE_API_BASE_URL,
  useMocks: parsedEnv.VITE_USE_MOCKS,
} as const

export type AppEnv = typeof env
