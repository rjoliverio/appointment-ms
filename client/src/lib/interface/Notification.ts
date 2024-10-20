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
  totalUnreadCount: number
  nextCursor?: string
}
