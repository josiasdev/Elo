import { env } from '@/config/env'
import type { YouthProfile } from '@/features/youth-profile/types/youthProfile'
import { delay } from '@/lib/delay'
import { mockYouthProfiles } from '@/mocks'
import { apiRequest } from '@/services/api/apiClient'

export interface YouthProfileRepository {
  getCurrentYouthProfile(): Promise<YouthProfile | null>
}

const mockYouthProfileRepository: YouthProfileRepository = {
  async getCurrentYouthProfile() {
    await delay()
    return mockYouthProfiles[0] ?? null
  },
}

const httpYouthProfileRepository: YouthProfileRepository = {
  getCurrentYouthProfile() {
    return apiRequest<YouthProfile | null>('/me')
  },
}

export const youthProfileRepository = env.useMocks
  ? mockYouthProfileRepository
  : httpYouthProfileRepository
