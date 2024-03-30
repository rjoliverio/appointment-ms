import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import type { Appointment as AppointmentModel } from '@prisma/client'

export class AppointmentEntity {
  @IsString()
  @ApiProperty()
  id: AppointmentModel['id']

  @IsBoolean()
  @ApiProperty()
  isApproved: AppointmentModel['isApproved']

  @IsString()
  @ApiProperty()
  title: AppointmentModel['title']

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  startTime: AppointmentModel['startTime']

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, nullable: true })
  @IsOptional()
  endTime: AppointmentModel['endTime']

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  createdAt: AppointmentModel['createdAt']

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  updatedAt: AppointmentModel['updatedAt']
}
