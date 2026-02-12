import { redirect } from 'next/navigation'

export class APIError extends Error {
  code: number

  constructor(message: string, code = 400) {
    super(message)

    this.code = code
    this.name = 'APIError'
  }
}

export type SearchParamValue = string | number | boolean | null | undefined

export function buildSearchParams(
  params: Record<string, SearchParamValue>,
): string {
  const cleanParams = removeNullValues(params)

  if (Object.keys(cleanParams).length > 0) {
    return `?${new URLSearchParams(cleanParams).toString()}`
  }

  return ''
}

export const removeNullValues = (input: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(input).filter((pair) => pair[1] !== null),
  ) as Record<string, string>

export async function sendRequest(
  uri: string,
  init?: RequestInit & {
    params?: Record<string, SearchParamValue>
  },
): Promise<any> {
  const urlParams = init?.params ? buildSearchParams(init.params) : ''

  let response: Response
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')

    const cookie = await cookies()
    const token = cookie.get('sessionToken')

    const headers = {
      ...init?.headers,
      ...(token?.value
        ? {
            Authorization: token.value,
          }
        : {}),
    }

    const url = `${process.env.USE_PROD_API === 'true' ? 'https://kewldan.ru/api' : process.env.API_URL_ENDPOINT}${uri}${urlParams}`

    try {
      response = await fetch(url, {
        ...init,
        headers,
      })
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new APIError('Сервер не отвечает', 500)
      }
      throw new APIError('Неизвестная ошибка', 500)
    }
  } else {
    try {
      response = await fetch(`/api${uri}${urlParams}`, init)
    } catch (e) {
      if (e instanceof TypeError) {
        throw new APIError('Сервер не отвечает', 500)
      }
      throw new APIError('Неизвестная ошибка', 500)
    }
  }

  let data: any
  try {
    data = await response.json()
  } catch {
    throw new APIError('Сервер не отвечает', 502)
  }

  if (response.status === 422) {
    throw new APIError(
      `Неверные данные, ${JSON.stringify(data)}`,
      response.status,
    )
  }

  const redirectedLocation = response.headers.get('location')

  if (redirectedLocation) {
    if (typeof window === 'undefined') {
      redirect(redirectedLocation)
    } else {
      window.location = redirectedLocation as Location & string

      throw new APIError('Не авторизован', 401)
    }
  }

  if (!data.ok) {
    throw new APIError(data.detail, response.status)
  }

  return data.data
}
