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
  const {
    data,
    isLoading: isLoadingNotifications,
    isValidating: isValidatingNotifications,
    mutate: mutateNotifications,
  } = useSWR<FindAllNotificationsResponse>(
    `/notifications${cursor ? `?cursor=${cursor}` : ''}`,
    genericFetcher,
  )
  const {
    data: notificationCountData,
    isLoading: isLoadingCount,
    isValidating: isValidatingCount,
    mutate: mutateCount,
  } = useSWR<GetNotificationUnreadCount>(
    '/notifications/unread/count',
    genericFetcher,
    { refreshInterval: 1000 * 30, refreshWhenHidden: true },
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
    setCursor(undefined)
    mutateNotifications()
    mutateCount()
  }

  useEffect(() => {
    setNotifications([...notifications, ...(data?.data ?? [])])
  }, [data])

  useEffect(() => {
    if (cursor === undefined) setNotifications(data?.data || [])
  }, [cursor, data])

  return {
    notifications,
    totalUnreadCount,
    refetchCursor,
    isLoadingNotifications,
    isValidatingNotifications,
    isLoadingCount,
    isValidatingCount,
    nextCursor,
    resetCursor,
    cursor,
  }
}
