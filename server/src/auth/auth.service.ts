import {
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

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ userId: setter.user.id }),
    }
  }
}
