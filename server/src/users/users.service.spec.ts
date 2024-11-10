import { Test, TestingModule } from '@nestjs/testing'
import { FindOneUserResponseDto } from './dto/find-one-user-response.dto'
import { UsersService } from './users.service'
import { PrismaServiceMock } from 'src/prisma/prisma.service.mock'
import { PrismaService } from 'src/prisma/prisma.service'

describe('UsersService', () => {
  let moduleRef: TestingModule
  let usersService: UsersService
  let prismaService: PrismaServiceMock

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile()

    usersService = moduleRef.get<UsersService>(UsersService)
    prismaService = moduleRef.get(PrismaService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('findOne', () => {
    it('should return the user data if the user exists', async () => {
      const userId = 'test-user-id'
      const mockUser = { id: userId, setter: true }

      prismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser)

      const result: FindOneUserResponseDto = await usersService.findOne(userId)

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { id: true, setter: true },
      })
      expect(result).toEqual({ data: mockUser })
    })

    it('should return null if the user does not exist', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null)

      const result = await usersService.findOne('non-existing-id')

      expect(result).toEqual({ data: null })
    })
  })

  describe('getAuthenticatedUser', () => {
    it('should return the user data when valid credentials are provided', async () => {
      const credentials = {
        id: 'valid-user-id',
        accessToken: 'valid-access-token',
      }
      const mockUser = { id: credentials.id, setter: true }

      prismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser)

      const result: FindOneUserResponseDto =
        await usersService.getAuthenticatedUser(credentials)

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: credentials.id, accessToken: credentials.accessToken },
        select: { id: true, setter: true },
      })
      expect(result).toEqual({ data: mockUser })
    })

    it('should return null when invalid credentials are provided', async () => {
      const credentials = {
        id: 'invalid-user-id',
        accessToken: 'invalid-access-token',
      }

      prismaService.user.findUnique = jest.fn().mockResolvedValue(null)

      const result = await usersService.getAuthenticatedUser(credentials)

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: credentials.id, accessToken: credentials.accessToken },
        select: { id: true, setter: true },
      })
      expect(result).toEqual({ data: null })
    })
  })
})
