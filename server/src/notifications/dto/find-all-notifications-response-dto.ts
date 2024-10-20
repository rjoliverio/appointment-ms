import { ApiProperty, PickType } from '@nestjs/swagger'
import { NotificationEntity } from '../entities/notification.entity'
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class FindAllNotificationsDataResponseDto extends PickType(
  NotificationEntity,
  ['title', 'description', 'link', 'readAt', 'createdAt', 'id'],
) {}

export class FindAllNotificationsResponseDto {
  @IsArray()
  @Type(() => FindAllNotificationsDataResponseDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: FindAllNotificationsDataResponseDto, isArray: true })
  data: FindAllNotificationsDataResponseDto[]

  @IsString()
  @ApiProperty({ type: String, nullable: true })
  nextCursor: string | null

  @IsNumber()
  @ApiProperty()
  totalUnreadCount: number
}
