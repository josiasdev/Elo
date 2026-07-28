import { credentialRepository } from '@/services/repositories/credentialRepository'

export const credentialService = {
  listCredentials: () => credentialRepository.listCredentials(),
}
