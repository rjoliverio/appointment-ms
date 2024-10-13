import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AuthEntity {
  @ApiProperty()
  @IsString()
  id: string
}
