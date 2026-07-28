import { env } from '@/config/env'
import { ApiHttpError, type ApiErrorPayload } from '@/services/api/apiErrors'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiRequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
}

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${env.apiBaseUrl}${normalizedPath}`
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text()

  if (text.length === 0) {
    return null
  }

  return JSON.parse(text) as unknown
}

function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof value.message === 'string'
  )
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const requestInit: RequestInit = {
    method: options.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      ...(options.body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  }

  if (options.body !== undefined) {
    requestInit.body = JSON.stringify(options.body)
  }

  if (options.signal !== undefined) {
    requestInit.signal = options.signal
  }

  const response = await fetch(buildUrl(path), requestInit)

  const payload = await parseResponse(response)

  if (!response.ok) {
    throw new ApiHttpError(response.status, isApiErrorPayload(payload) ? payload : null)
  }

  return payload as TResponse
}
