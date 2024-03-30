import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsString } from 'class-validator'
import { SetterEntity } from 'src/users/entity/setter.entity'

export class CreateAppointmentDto extends OmitType(SetterEntity, ['id']) {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  startTime: Date

  @IsString()
  @ApiProperty()
  title: string
}
