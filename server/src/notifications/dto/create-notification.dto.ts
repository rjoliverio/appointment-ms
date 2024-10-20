import { PickType } from '@nestjs/swagger'
import { NotificationEntity } from '../entities/notification.entity'

export class CreateNotificationDto extends PickType(NotificationEntity, [
  'title',
  'description',
  'notificationType',
  'senderId',
  'link',
]) {}
