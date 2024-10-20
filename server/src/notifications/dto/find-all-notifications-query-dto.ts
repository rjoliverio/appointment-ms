import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
export class FindAllNotificationsQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  cursor: string | null

  @IsNumber()
  @ApiProperty({ type: Number, default: 10 })
  take: number = 10
}
