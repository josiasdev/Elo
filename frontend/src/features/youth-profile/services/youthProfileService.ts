import { youthProfileRepository } from '@/services/repositories/youthProfileRepository'

export const youthProfileService = {
  getCurrentYouthProfile: () => youthProfileRepository.getCurrentYouthProfile(),
}
