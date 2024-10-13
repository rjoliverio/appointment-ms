import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle('Appointment Management System')
    .setDescription('The API endpoint for appointment-ms')
    .setVersion('1.0')
    .addCookieAuth('Authentication')
    .build()
  app.use(cookieParser())
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(3030)
}
bootstrap()
