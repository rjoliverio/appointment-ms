import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { FindAllNotificationsQueryDto } from './dto/find-all-notifications-query-dto'
import { FindAllNotificationsResponseDto } from './dto/find-all-notifications-response-dto'
import { selectFindAllNotifications } from './queries/notification.queries'

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.prisma.notification.create({
        data: {
          ...createNotificationDto,
        },
        select: {
          id: true,
          notificationType: true,
          title: true,
          description: true,
          sender: true,
        },
      })
      return notification
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(
    queryDto: FindAllNotificationsQueryDto,
  ): Promise<FindAllNotificationsResponseDto> {
    const { cursor, take } = queryDto

    // Fetch notifications after the provided cursor
    const notifications = await this.prisma.notification.findMany({
      take: take,
      skip: cursor ? 1 : 0, // Skip the cursor itself
      cursor:
        cursor ?
          {
            id: cursor,
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      select: selectFindAllNotifications,
    })

    const nextCursor =
      notifications.length === take ? notifications[take - 1].id : null

    const totalUnreadCount = await this.prisma.notification.count({
      where: {
        readAt: null,
      },
    })

    return {
      data: notifications,
      totalUnreadCount,
      nextCursor,
    }
  }

  async updateReadAt(id: string) {
    try {
      const notification = await this.prisma.notification.update({
        where: { id },
        data: { readAt: new Date() },
        select: { id: true },
      })

      return { id: notification.id }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
