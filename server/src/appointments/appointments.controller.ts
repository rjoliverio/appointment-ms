import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { ApiOkResponse } from '@nestjs/swagger'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import {
  FindAllAppointmentResponseDto,
  UpdateAppointmentStatusDto,
} from './dto/find-all-appointments-response.dto'

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOkResponse()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<void> {
    await this.appointmentsService.create(createAppointmentDto)
  }

  @Get()
  @ApiOkResponse()
  async findAll(): Promise<FindAllAppointmentResponseDto> {
    return await this.appointmentsService.findAll()
  }

  @Post('update-status')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOkResponse()
  async updateStatus(
    @Body() updateStatusDto: UpdateAppointmentStatusDto,
  ): Promise<void> {
    await this.appointmentsService.updateStatus(updateStatusDto)
  }
}
