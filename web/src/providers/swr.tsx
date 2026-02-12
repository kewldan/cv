'use client'

import type { PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'
import {
  APIError,
  buildSearchParams,
  type SearchParamValue,
} from '@/lib/api/base'

async function fetcher(
  uri: string | [string, Record<string, SearchParamValue>],
) {
  let res: Response | undefined
  if (typeof uri === 'string') {
    res = await fetch(`/api${uri}`)
  } else {
    res = await fetch(`/api${uri[0]}${buildSearchParams(uri[1])}`)
  }

  if (res.status !== 200) {
    const data = await res.json()

    throw new APIError(data.detail, res.status)
  }

  const data = await res.json()

  return data.data
}

export const SWRProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        keepPreviousData: true,
        revalidateOnFocus: false,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}
