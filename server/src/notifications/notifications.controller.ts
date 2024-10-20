import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto)
  }
}
