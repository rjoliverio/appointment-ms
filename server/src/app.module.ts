import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { AppointmentsModule } from './appointments/appointments.module'

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, AppointmentsModule],
})
export class AppModule {}
