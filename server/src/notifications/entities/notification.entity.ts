import { ApiProperty } from '@nestjs/swagger'
import {
  NotificationType,
  type Notification as NotificationModel,
} from '@prisma/client'
import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'

export class NotificationEntity {
  @IsString()
  @ApiProperty()
  id: NotificationModel['id']

  @IsEnum(NotificationType)
  @ApiProperty({
    type: String,
    enum: NotificationType,
    enumName: 'NotificationType',
  })
  notificationType: NotificationModel['notificationType']

  @IsString()
  @ApiProperty()
  title: NotificationModel['title']

  @IsString()
  @ApiProperty()
  description: NotificationModel['description']

  @IsString()
  @ApiProperty()
  link: NotificationModel['link']

  @IsString()
  @ApiProperty()
  senderId: NotificationModel['senderId']

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  createdAt: NotificationModel['createdAt']

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  updatedAt: NotificationModel['updatedAt']

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ type: Date, nullable: true })
  readAt?: NotificationModel['readAt']
}
