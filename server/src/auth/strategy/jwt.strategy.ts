//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(req: Request, payload: { userId: string }) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    const user = await this.usersService.getAuthenticatedUser({
      id: payload.userId,
      accessToken,
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
