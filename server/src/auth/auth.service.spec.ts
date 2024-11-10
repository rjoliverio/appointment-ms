import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { PrismaServiceMock } from 'src/prisma/prisma.service.mock'
import { PrismaService } from 'src/prisma/prisma.service'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import ms from 'ms'
import { Response } from 'express'

describe('AuthService', () => {
  let moduleRef: TestingModule
  let authService: AuthService
  let prismaService: PrismaServiceMock
  let jwtService: JwtService
  let configService: ConfigService

  class JwtServiceMock {}
  class ConfigServiceMock {}

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        { provide: PrismaService, useClass: PrismaServiceMock },
        { provide: JwtService, useClass: JwtServiceMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
      ],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)
    prismaService = moduleRef.get(PrismaService)
    jwtService = moduleRef.get(JwtService)
    configService = moduleRef.get(ConfigService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('verifyUser', () => {
    const mockSetter = {
      id: 'setter-id',
      email: 'test@example.com',
      user: { id: 'user-id', password: 'hashed-password' }, // assuming password is hashed
      firstName: 'John',
      lastName: 'Doe',
    }

    it('should throw NotFoundException if the user is not found', async () => {
      const email = 'nonexistent@example.com'
      const password = 'password'

      prismaService.setter.findUnique = jest.fn().mockResolvedValue(null) // Mock that no setter is found

      await expect(authService.verifyUser(email, password)).rejects.toThrow(
        new NotFoundException(`No user found for email: ${email}`),
      )
    })

    it('should throw UnauthorizedException if the password is incorrect', async () => {
      const email = 'test@example.com'
      const password = 'wrongpassword'

      prismaService.setter.findUnique = jest.fn().mockResolvedValue(mockSetter)

      await expect(authService.verifyUser(email, password)).rejects.toThrow(
        new UnauthorizedException('Invalid password'),
      )
    })
  })

  describe('login', () => {
    const mockResponse = {
      cookie: jest.fn(),
    } as unknown as Response

    const mockUser = { id: 'user-id' }
    it('should generate a JWT, set a cookie, and return the user', async () => {
      const expires = new Date()
      const accessToken = 'generated-jwt-token'
      const jwtExpiration = '1h' // Mock JWT expiration time

      configService.getOrThrow = jest.fn().mockReturnValue(jwtExpiration)
      jwtService.sign = jest.fn().mockReturnValue(accessToken)

      // Mock the cookie expiration calculation
      expires.setMilliseconds(expires.getMilliseconds() + ms(jwtExpiration))

      const result = await authService.login(mockUser, mockResponse)

      expect(configService.getOrThrow).toHaveBeenCalledWith('JWT_EXPIRATION')
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id })
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'Authentication',
        accessToken,
        {
          secure: true,
          httpOnly: true,
          expires,
        },
      )
      expect(result).toEqual(mockUser)
    })
  })

  describe('logout', () => {
    const mockResponse = {
      clearCookie: jest.fn(),
      send: jest.fn(),
    } as unknown as Response

    it('should clear the Authentication cookie and send a response', async () => {
      await authService.logout(mockResponse)

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('Authentication', {
        secure: true,
        httpOnly: true,
      })
      expect(mockResponse.send).toHaveBeenCalled()
    })
  })
})
