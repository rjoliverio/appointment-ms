import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SetterEntity {
  @IsString()
  @ApiProperty()
  id: string

  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  contactNumber: string
}
