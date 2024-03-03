import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { FindOneUserResponseDto } from './dto/find-one-user-response.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FindOneUserResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id)
  }
}
