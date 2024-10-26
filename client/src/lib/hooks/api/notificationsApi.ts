'use client'

import { genericFetcher } from '@/app/actions'
import {
  FindAllNotificationsResponse,
  GetNotificationUnreadCount,
  Notification,
} from '@/lib/interface/Notification'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

export const useNotifications = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined)

  const [notifications, setNotifications] = useState<Notification[]>([])
  const { data, isLoading, isValidating, mutate } =
    useSWR<FindAllNotificationsResponse>(
      `/notifications${cursor ? `?cursor=${cursor}` : ''}`,
      genericFetcher,
    )
  const { data: notificationCountData } = useSWR<GetNotificationUnreadCount>(
    '/notifications/unread/count',
    genericFetcher,
    { refreshInterval: 1000 * 30 },
  )

  const totalUnreadCount = useMemo(
    () => notificationCountData?.totalUnreadCount ?? 0,
    [notificationCountData],
  )

  const nextCursor = useMemo(() => data?.nextCursor ?? undefined, [data])

  const refetchCursor = () => {
    if (nextCursor) setCursor(nextCursor)
  }

  const resetCursor = () => {
    setNotifications([])
    setCursor(undefined)
  }

  useEffect(() => {
    setNotifications([...notifications, ...(data?.data ?? [])])
  }, [data])

  return {
    notifications,
    totalUnreadCount,
    refetchCursor,
    isLoading,
    isValidating,
    nextCursor,
    resetCursor,
    cursor,
    mutate,
  }
}
