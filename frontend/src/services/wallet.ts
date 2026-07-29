import { api } from '@/lib/api'
import type { BackendCredential } from '@/adapters/credential.adapter'

export type PublicWallet = {
  young: {
    apelido: string
    ano_nascimento: number
    municipio: { nome: string; uf: string }
  }
  credentials: BackendCredential[]
}

export async function fetchPublicWallet(slug: string): Promise<PublicWallet> {
  return api.get<PublicWallet>(`/wallet/public/${encodeURIComponent(slug)}`)
}
