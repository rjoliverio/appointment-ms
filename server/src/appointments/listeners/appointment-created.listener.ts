import { BadRequestException, Injectable } from '@nestjs/common'
import { EventTypes } from 'src/event-emitter/event-types'
import { OnEvent } from '@nestjs/event-emitter'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto'
import { NotificationType } from '@prisma/client'
import { NotificationsService } from 'src/notifications/notifications.service'

@Injectable()
export class AppointmentCreatedListener {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  @OnEvent(EventTypes.AppointmentCreated)
  async sendNotification({ appointmentId }: { appointmentId: string }) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      select: {
        title: true,
        setter: true,
        startTime: true,
      },
    })

    if (!appointment) throw new BadRequestException('Appointment not found')

    const createNotificationDto: CreateNotificationDto = {
      title: appointment.title,
      description: `Incoming appointment for ${appointment.setter.name}`,
      notificationType: NotificationType.Appointment,
      senderId: appointment.setter.id,
      //TODO: update link
      link: '/',
    }

    await this.notificationsService.create(createNotificationDto)
  }
}
