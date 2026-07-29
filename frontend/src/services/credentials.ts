import { api } from '@/lib/api'
import type { BackendCredential, OnChainStatus } from '@/adapters/credential.adapter'

export type CredentialVerifyResponse = {
  credential: BackendCredential
  on_chain: OnChainStatus
}

export async function fetchCredentialVerification(
  id: string,
): Promise<CredentialVerifyResponse> {
  return api.get<CredentialVerifyResponse>(`/credentials/${encodeURIComponent(id)}/verify`)
}
