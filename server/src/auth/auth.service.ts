import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import ms from 'ms'
import { Response } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { FindOneUserDto } from 'src/users/dto/find-one-user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyUser(email: string, password: string) {
    const setter = await this.prisma.setter.findUnique({
      where: { email },
      select: {
        user: true,
      },
    })

    if (!setter || !setter.user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const isPasswordValid = await bcrypt.compare(password, setter.user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    return { id: setter.user.id }
  }

  async login(
    user: Pick<FindOneUserDto, 'id'>,
    response: Response,
  ): Promise<Pick<FindOneUserDto, 'id'>> {
    const expires = new Date()
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.getOrThrow<string>('JWT_EXPIRATION')),
    )

    const accessToken = this.jwtService.sign({ id: user.id })
    response.cookie('Authentication', accessToken, {
      secure: true,
      httpOnly: true,
      expires,
    })

    return user
  }

  async logout(response: Response): Promise<void> {
    response.clearCookie('Authentication')
    response.send()
  }
}
