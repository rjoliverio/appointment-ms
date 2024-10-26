import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import {
  FindAllAppointmentResponseDto,
  UpdateAppointmentStatusDto,
} from './dto/find-all-appointments-response.dto'
import { AppointmentStatus } from '@prisma/client'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { EventTypes } from 'src/event-emitter/event-types'

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<void> {
    const { startTime, title, ...setterData } = createAppointmentDto
    const appointment = await this.prisma.$transaction(
      async (transactionPrisma) => {
        let setter = await transactionPrisma.setter.findUnique({
          where: { email: setterData.email },
          select: {
            id: true,
          },
        })

        if (!setter) {
          setter = await transactionPrisma.setter.create({
            data: setterData,
          })
        }

        const appointment = await transactionPrisma.appointment.create({
          data: {
            status: AppointmentStatus.Waiting,
            startTime,
            title,
            setter: { connect: { id: setter.id } },
          },
          select: { id: true },
        })

        return appointment
      },
    )

    this.eventEmitter.emit(EventTypes.AppointmentCreated, {
      appointmentId: appointment.id,
    })
  }

  async findAll(): Promise<FindAllAppointmentResponseDto> {
    const appointments = await this.prisma.appointment.findMany({
      include: {
        setter: true,
      },
    })
    return { data: appointments }
  }

  async updateStatus({
    id,
    status,
  }: UpdateAppointmentStatusDto): Promise<void> {
    try {
      await this.prisma.appointment.update({
        data: {
          status,
        },
        where: {
          id,
        },
      })
    } catch (error) {
      throw new BadRequestException('Failed to update appointment status')
    }
  }
}
