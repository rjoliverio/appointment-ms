import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { PrismaService } from 'src/prisma/prisma.service'

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

  async findAll() {
    return `This action returns all notifications`
  }
}
