import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsObject, ValidateNested } from 'class-validator'
import { AppointmentEntity } from '../entities/appointment.entity'
import { SetterEntity } from 'src/users/entity/setter.entity'

export class FindOneAppointmentDto extends AppointmentEntity {
  @IsObject()
  @Type(() => SetterEntity)
  @ApiProperty({ type: SetterEntity })
  setter: SetterEntity
}

export class FindAllAppointmentResponseDto {
  @IsArray()
  @Type(() => FindOneAppointmentDto)
  @ValidateNested({ each: true })
  @ApiProperty({ type: FindOneAppointmentDto, isArray: true })
  data: FindOneAppointmentDto[]
}

export class UpdateAppointmentStatusDto extends PickType(AppointmentEntity, [
  'id',
  'status',
]) {}
