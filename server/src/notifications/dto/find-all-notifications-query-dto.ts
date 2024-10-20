import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
export class FindAllNotificationsQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  cursor?: string

  @IsNumber()
  @ApiProperty({ type: Number, default: 5 })
  take: number = 5
}
