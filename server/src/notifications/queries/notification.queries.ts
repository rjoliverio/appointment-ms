import { Prisma } from '@prisma/client'

export const selectFindAllNotifications: Prisma.NotificationSelect = {
  id: true,
  title: true,
  description: true,
  link: true,
  readAt: true,
  createdAt: true,
}
