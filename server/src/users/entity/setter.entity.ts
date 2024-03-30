import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import type { Setter as SetterModel } from '@prisma/client'

export class SetterEntity {
  @IsString()
  @ApiProperty()
  id: SetterModel['id']

  @IsString()
  @ApiProperty()
  name: SetterModel['name']

  @IsEmail()
  @IsString()
  @ApiProperty()
  email: SetterModel['email']

  @IsString()
  @ApiProperty()
  contactNumber: SetterModel['contactNumber']
}
