import { authFetcher } from '@/lib/fetcher'
import { UserResponse } from '@/lib/interface/User'
import { useMemo } from 'react'
import useSWR from 'swr'

export const authApi = () => {
  const { data, isLoading } = useSWR<UserResponse>('/auth/me', authFetcher)

  const user = useMemo(() => data?.data || null, [data])

  return { user, isLoading }
}
