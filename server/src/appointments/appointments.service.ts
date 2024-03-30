import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { FindAllAppointmentResponseDto } from './dto/find-all-appointments-response.dto'

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<void> {
    const { startTime, title, ...setterData } = createAppointmentDto
    try {
      await this.prisma.$transaction(async (prisma) => {
        let setter = await prisma.setter.findUnique({
          where: { email: setterData.email },
          select: {
            id: true,
          },
        })

        if (!setter) {
          setter = await prisma.setter.create({
            data: setterData,
          })
        }

        await prisma.appointment.create({
          data: {
            startTime,
            title,
            setter: { connect: { id: setter.id } },
          },
        })
      })
    } catch (error) {
      throw new BadRequestException('Cannot create appointment')
    }
  }

  async findAll(): Promise<FindAllAppointmentResponseDto> {
    const appointments = await this.prisma.appointment.findMany({
      where: { isApproved: true },
      include: {
        setter: true,
      },
    })
    return { data: appointments }
  }
}
