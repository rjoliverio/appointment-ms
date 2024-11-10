import { Test, TestingModule } from '@nestjs/testing'
import { NotificationsService } from './notifications.service'
import { PrismaServiceMock } from 'src/prisma/prisma.service.mock'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { InternalServerErrorException } from '@nestjs/common'
import { FindAllNotificationsQueryDto } from './dto/find-all-notifications-query-dto'
import { selectFindAllNotifications } from './queries/notification.queries'
import {
  FindAllNotificationsResponseDto,
  GetNotificationUnreadCount,
} from './dto/find-all-notifications-response-dto'

describe('NotificationsService', () => {
  let moduleRef: TestingModule
  let notificationsService: NotificationsService
  let prismaService: PrismaServiceMock

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        NotificationsService,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile()

    notificationsService =
      moduleRef.get<NotificationsService>(NotificationsService)
    prismaService = moduleRef.get(PrismaService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('create', () => {
    it('should create a notification successfully', async () => {
      const createNotificationDto: CreateNotificationDto = {
        notificationType: 'Appointment',
        title: 'Test Notification',
        description: 'This is a test notification',
        senderId: 'sender-id',
        link: '/',
      }

      const mockNotification = {
        id: '1',
        notificationType: 'Appointment',
        title: 'Test Notification',
        description: 'This is a test notification',
        senderId: 'sender-id',
        link: '/',
      }

      prismaService.notification.create = jest
        .fn()
        .mockResolvedValue(mockNotification)

      const result = await notificationsService.create(createNotificationDto)

      expect(prismaService.notification.create).toHaveBeenCalledWith({
        data: createNotificationDto,
        select: {
          id: true,
          notificationType: true,
          title: true,
          description: true,
          sender: true,
        },
      })
      expect(result).toEqual(mockNotification)
    })

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      const createNotificationDto: CreateNotificationDto = {
        notificationType: 'Appointment',
        title: 'Error Notification',
        description: 'This is an error notification',
        senderId: 'sender-id',
        link: '/',
      }

      const mockError = new Error('Database error')
      prismaService.notification.create = jest.fn().mockRejectedValue(mockError)

      await expect(
        notificationsService.create(createNotificationDto),
      ).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findAll', () => {
    it('should return a list of notifications and a nextCursor when more results are available', async () => {
      const queryDto: FindAllNotificationsQueryDto = {
        take: 5,
        cursor: 'cursor-id',
      }
      const mockNotifications = [
        {
          id: '1',
          notificationType: 'Appointment',
          title: 'Test 1',
          description: 'Description 1',
          senderId: 'sender-id-1',
          createdAt: new Date(),
        },
        {
          id: '2',
          notificationType: 'Appointment',
          title: 'Test 2',
          description: 'Description 2',
          senderId: 'sender-id-2',
          createdAt: new Date(),
        },
        {
          id: '3',
          notificationType: 'Appointment',
          title: 'Test 3',
          description: 'Description 3',
          senderId: 'sender-id-3',
          createdAt: new Date(),
        },
        {
          id: '4',
          notificationType: 'Appointment',
          title: 'Test 4',
          description: 'Description 4',
          senderId: 'sender-id-4',
          createdAt: new Date(),
        },
        {
          id: '5',
          notificationType: 'Appointment',
          title: 'Test 5',
          description: 'Description 5',
          senderId: 'sender-id-5',
          createdAt: new Date(),
        },
      ]

      prismaService.notification.findMany = jest
        .fn()
        .mockResolvedValue(mockNotifications)

      const result: FindAllNotificationsResponseDto =
        await notificationsService.findAll(queryDto)

      expect(prismaService.notification.findMany).toHaveBeenCalledWith({
        take: queryDto.take,
        skip: 1,
        cursor: { id: queryDto.cursor },
        orderBy: { createdAt: 'desc' },
        select: selectFindAllNotifications,
      })
      expect(result).toEqual({
        data: mockNotifications,
        nextCursor: '5',
      })
    })

    it('should return a list of notifications without nextCursor if there are no more results', async () => {
      const queryDto: FindAllNotificationsQueryDto = { take: 3 }
      const mockNotifications = [
        {
          id: '1',
          notificationType: 'Appointment',
          title: 'Test 1',
          description: 'Description 1',
          sender: 'system',
          createdAt: new Date(),
        },
        {
          id: '2',
          notificationType: 'ALERT',
          title: 'Test 2',
          description: 'Description 2',
          sender: 'system',
          createdAt: new Date(),
        },
      ]

      prismaService.notification.findMany = jest
        .fn()
        .mockResolvedValue(mockNotifications)

      const result: FindAllNotificationsResponseDto =
        await notificationsService.findAll(queryDto)

      expect(prismaService.notification.findMany).toHaveBeenCalledWith({
        take: queryDto.take,
        skip: 0,
        cursor: undefined,
        orderBy: { createdAt: 'desc' },
        select: selectFindAllNotifications,
      })
      expect(result).toEqual({
        data: mockNotifications,
        nextCursor: undefined,
      })
    })
  })

  describe('getUnreadCount', () => {
    it('should return the count of unread notifications', async () => {
      const mockUnreadCount = 5
      prismaService.notification.count = jest
        .fn()
        .mockResolvedValue(mockUnreadCount)

      const result: GetNotificationUnreadCount =
        await notificationsService.getUnreadCount()

      expect(prismaService.notification.count).toHaveBeenCalledWith({
        where: { readAt: null },
      })
      expect(result).toEqual({ totalUnreadCount: mockUnreadCount })
    })
  })

  describe('updateReadAt', () => {
    it('should update the readAt field and return the notification id', async () => {
      const notificationId = 'test-notification-id'
      const mockUpdatedNotification = { id: notificationId }

      prismaService.notification.update = jest
        .fn()
        .mockResolvedValue(mockUpdatedNotification)

      const result = await notificationsService.updateReadAt(notificationId)

      expect(prismaService.notification.update).toHaveBeenCalledWith({
        where: { id: notificationId },
        data: { readAt: expect.any(Date) },
        select: { id: true },
      })
      expect(result).toEqual({ id: notificationId })
    })

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      const notificationId = 'test-notification-id'
      const mockError = new Error('Database error')
      prismaService.notification.update = jest.fn().mockRejectedValue(mockError)

      await expect(
        notificationsService.updateReadAt(notificationId),
      ).rejects.toThrow(InternalServerErrorException)
    })
  })
})
