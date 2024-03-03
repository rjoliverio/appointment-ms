import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsObject } from 'class-validator'
import { SetterEntity } from '../entity/setter.entity'

export class FindOneUserDto {
  @IsString()
  @ApiProperty()
  id: string

  @IsObject()
  @ApiProperty({ type: SetterEntity })
  setter: SetterEntity
}
