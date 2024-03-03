import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthEntity } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'
import { ApiOkResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() credential: LoginDto) {
    return this.authService.login(credential)
  }
}
