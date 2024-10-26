import { Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { AppointmentCreatedListener } from './listeners/appointment-created.listener'
import { NotificationsModule } from 'src/notifications/notifications.module'

@Module({
  controllers: [AppointmentsController],
  imports: [NotificationsModule],
  providers: [AppointmentsService, AppointmentCreatedListener],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
