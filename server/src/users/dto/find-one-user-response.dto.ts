import { ApiProperty } from '@nestjs/swagger'
import { IsObject } from 'class-validator'
import { SetterEntity } from '../entity/setter.entity'
import { FindOneUserDto } from './find-one-user.dto'

export class FindOneUserResponseDto {
  @IsObject()
  @ApiProperty({ type: SetterEntity, nullable: true })
  data: FindOneUserDto | null
}
