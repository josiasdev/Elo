export interface ApiErrorPayload {
  message: string
  code?: string
  details?: unknown
}

export class ApiHttpError extends Error {
  readonly status: number
  readonly payload: ApiErrorPayload | null

  constructor(status: number, payload: ApiErrorPayload | null) {
    super(payload?.message ?? `Erro HTTP ${status}`)
    this.name = 'ApiHttpError'
    this.status = status
    this.payload = payload
  }
}
