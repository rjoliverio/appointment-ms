import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { FindOneUserDto } from 'src/users/dto/find-one-user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Authentication
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    })
  }

  async validate(payload: Pick<FindOneUserDto, 'id'>) {
    return payload
  }
}
