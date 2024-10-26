import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AppointmentsModule } from './appointments/appointments.module'
import { ConfigModule } from '@nestjs/config'
import { NotificationsModule } from './notifications/notifications.module'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    AppointmentsModule,
    ConfigModule.forRoot(),
    NotificationsModule,
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
})
export class AppModule {}
