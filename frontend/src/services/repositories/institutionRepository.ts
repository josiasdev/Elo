import { env } from '@/config/env'
import type { Institution } from '@/features/institutions/types/institution'
import { delay } from '@/lib/delay'
import { mockInstitutions } from '@/mocks'
import { apiRequest } from '@/services/api/apiClient'

export interface InstitutionRepository {
  listInstitutions(): Promise<Institution[]>
}

const mockInstitutionRepository: InstitutionRepository = {
  async listInstitutions() {
    await delay()
    return [...mockInstitutions]
  },
}

const httpInstitutionRepository: InstitutionRepository = {
  listInstitutions() {
    return apiRequest<Institution[]>('/institutions')
  },
}

export const institutionRepository = env.useMocks
  ? mockInstitutionRepository
  : httpInstitutionRepository
