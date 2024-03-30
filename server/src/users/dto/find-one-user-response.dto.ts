import { ApiProperty } from '@nestjs/swagger'
import { IsObject } from 'class-validator'
import { FindOneUserDto } from './find-one-user.dto'

export class FindOneUserResponseDto {
  @IsObject()
  @ApiProperty({ type: FindOneUserDto, nullable: true })
  data: FindOneUserDto | null
}
