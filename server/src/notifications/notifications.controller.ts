import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { FindAllNotificationsQueryDto } from './dto/find-all-notifications-query-dto'

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationsService.create(createNotificationDto)
  }

  @Get()
  async findAll(@Query() query: FindAllNotificationsQueryDto) {
    return await this.notificationsService.findAll(query)
  }

  @Put()
  async updateReadAt(@Body() id: string) {
    return await this.notificationsService.updateReadAt(id)
  }
}
