import { env } from '@/config/env'
import type { Credential } from '@/features/civic-wallet/types/credential'
import { delay } from '@/lib/delay'
import { mockCredentials } from '@/mocks'
import { apiRequest } from '@/services/api/apiClient'

export interface CredentialRepository {
  listCredentials(): Promise<Credential[]>
}

const mockCredentialRepository: CredentialRepository = {
  async listCredentials() {
    await delay()
    return [...mockCredentials]
  },
}

const httpCredentialRepository: CredentialRepository = {
  listCredentials() {
    return apiRequest<Credential[]>('/credentials')
  },
}

export const credentialRepository = env.useMocks
  ? mockCredentialRepository
  : httpCredentialRepository
