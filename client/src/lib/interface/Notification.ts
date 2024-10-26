export interface Notification {
  id: string
  title: string
  description: string
  link: string
  readAt: string | null
  createdAt: string
}

export interface FindAllNotificationsResponse {
  data: Notification[]
  nextCursor?: string
}

export interface GetNotificationUnreadCount {
  totalUnreadCount: number
}
