'use client'

import { notificationsFetcher } from '@/app/actions'
import {
  FindAllNotificationsResponse,
  Notification,
} from '@/lib/interface/Notification'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

export const useNotifications = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { data, isLoading } = useSWR<FindAllNotificationsResponse>(
    ['/notifications', cursor],
    ([url, cursor]) => notificationsFetcher(url, cursor as string | undefined),
  )

  const { totalUnreadCount, nextCursor } = useMemo(() => {
    return {
      totalUnreadCount: data?.totalUnreadCount ?? 0,
      nextCursor: data?.nextCursor ?? undefined,
    }
  }, [data])

  useEffect(() => {
    setNotifications([...notifications, ...(data?.data || [])])
  }, [data])

  const refetch = () => setCursor(nextCursor)

  return {
    notifications,
    totalUnreadCount,
    refetch,
    isLoading,
    nextCursor,
  }
}
