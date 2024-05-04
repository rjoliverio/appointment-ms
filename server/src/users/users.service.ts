import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { FindOneUserResponseDto } from './dto/find-one-user-response.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<FindOneUserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        setter: true,
      },
    })
    return { data: user }
  }

  async getAuthenticatedUser(credential: {
    id: string
    accessToken: string
  }): Promise<FindOneUserResponseDto> {
    const { id, accessToken } = credential
    const user = await this.prisma.user.findUnique({
      where: { id, accessToken },
      select: {
        id: true,
        setter: true,
      },
    })
    return { data: user }
  }
}
