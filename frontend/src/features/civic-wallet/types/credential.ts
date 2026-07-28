import type { EntityId } from '@/types/common'

export type CredentialVerificationStatus = 'pending' | 'verified' | 'failed' | 'revoked'

export type CredentialVisibility = 'private' | 'shared' | 'public'

export interface Credential {
  id: EntityId
  participationId: EntityId
  issuerName: string
  activityTitle: string
  issuedAt: string
  verificationStatus: CredentialVerificationStatus
  visibility: CredentialVisibility
  transactionHash: string | null
  credentialHash: string
  isRevoked: boolean
}
