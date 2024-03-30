import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthEntity } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'
import { ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthUser } from 'src/decorators/user.decorator'
import { FindOneUserDto } from 'src/users/dto/find-one-user.dto'
import { UsersService } from 'src/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() credential: LoginDto) {
    return await this.authService.login(credential)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FindOneUserDto })
  async getUser(@AuthUser() user: FindOneUserDto) {
    return await this.userService.findOne(user.id)
  }
}
