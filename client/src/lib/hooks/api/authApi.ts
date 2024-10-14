import { authFetcher } from '@/app/login/actions'
import { UserResponse } from '@/lib/interface/User'
import { useMemo } from 'react'
import useSWR, { mutate } from 'swr'

export const authApi = () => {
  const { data, isLoading } = useSWR<UserResponse>('/auth/me', authFetcher)
  const user = useMemo(() => data?.data || null, [data?.data])

  const refetch = mutate('/auth/me')

  return { user, isLoading, refetch }
}
