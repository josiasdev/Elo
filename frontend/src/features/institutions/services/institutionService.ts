import { institutionRepository } from '@/services/repositories/institutionRepository'

export const institutionService = {
  listInstitutions: () => institutionRepository.listInstitutions(),
}
