import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { AuthEntity } from './entity/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const setter = await this.prisma.setter.findUnique({
      where: { email },
      select: {
        user: true,
      },
    })

    // If no user is found, throw an error
    if (!setter || !setter.user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, setter.user.password)

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    const accessToken = this.jwtService.sign({ userId: setter.user.id })

    try {
      await this.prisma.user.update({
        where: { id: setter.user.id },
        data: {
          accessToken,
        },
      })
    } catch (error) {
      throw new BadRequestException('Cannot update user token')
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken,
    }
  }

  async logout(id: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          accessToken: null,
        },
      })
    } catch (error) {
      throw new BadRequestException('Failed to logout user')
    }
  }
}
