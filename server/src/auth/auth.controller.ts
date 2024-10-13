import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthEntity } from './entity/auth.entity'
import { ApiOkResponse } from '@nestjs/swagger'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthUser } from 'src/decorators/user.decorator'
import { FindOneUserDto } from 'src/users/dto/find-one-user.dto'
import { UsersService } from 'src/users/users.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @AuthUser() user: Pick<FindOneUserDto, 'id'>,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response)
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  async logout(@Res() response: Response) {
    await this.authService.logout(response)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@AuthUser() user: Pick<FindOneUserDto, 'id'>) {
    return await this.userService.findOne(user.id)
  }
}
