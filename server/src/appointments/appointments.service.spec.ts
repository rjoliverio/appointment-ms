import { Test, TestingModule } from '@nestjs/testing'
import { PrismaServiceMock } from 'src/prisma/prisma.service.mock'
import { PrismaService } from 'src/prisma/prisma.service'
import { AppointmentsService } from './appointments.service'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { EventTypes } from 'src/event-emitter/event-types'
import {
  FindAllAppointmentResponseDto,
  UpdateAppointmentStatusDto,
} from './dto/find-all-appointments-response.dto'
import { BadRequestException } from '@nestjs/common'

describe('AppointmentService', () => {
  let moduleRef: TestingModule
  let appointmentsService: AppointmentsService
  let prismaService: PrismaServiceMock
  let eventEmitter: EventEmitter2

  class EventEmitter2Mock {
    emit = jest.fn()
  }

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        AppointmentsService,
        { provide: PrismaService, useClass: PrismaServiceMock },
        { provide: EventEmitter2, useClass: EventEmitter2Mock },
      ],
    }).compile()

    appointmentsService =
      moduleRef.get<AppointmentsService>(AppointmentsService)
    prismaService = moduleRef.get(PrismaService)
    eventEmitter = moduleRef.get(EventEmitter2)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('findOne', () => {
    it('should create a new appointment and emit an event', async () => {
      const createAppointmentDto: CreateAppointmentDto = {
        startTime: new Date(),
        title: 'Sample Appointment',
        email: 'test@example.com',
        name: 'John Doe',
        contactNumber: '09123456789',
      }

      const mockSetter = { id: 'setter-id' }
      const mockAppointment = { id: 'appointment-id' }

      prismaService.$transaction = jest.fn(async (callback) => {
        return await callback({
          setter: {
            findUnique: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(mockSetter),
          },
          appointment: {
            create: jest.fn().mockResolvedValue(mockAppointment),
          },
        })
      })

      await appointmentsService.create(createAppointmentDto)

      expect(prismaService.$transaction).toHaveBeenCalled()
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        EventTypes.AppointmentCreated,
        {
          appointmentId: mockAppointment.id,
        },
      )
    })

    it('should find an existing setter, create an appointment, and emit an event', async () => {
      const createAppointmentDto: CreateAppointmentDto = {
        startTime: new Date(),
        title: 'Sample Appointment',
        email: 'existing@example.com',
        name: 'Jane Doe',
        contactNumber: '09123456789',
      }

      const existingSetter = { id: 'existing-setter-id' }
      const mockAppointment = { id: 'new-appointment-id' }

      prismaService.$transaction = jest.fn(async (callback) => {
        return await callback({
          setter: {
            findUnique: jest.fn().mockResolvedValue(existingSetter),
            create: jest.fn(),
          },
          appointment: {
            create: jest.fn().mockResolvedValue(mockAppointment),
          },
        })
      })

      await appointmentsService.create(createAppointmentDto)

      expect(prismaService.$transaction).toHaveBeenCalled()
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        EventTypes.AppointmentCreated,
        {
          appointmentId: mockAppointment.id,
        },
      )
    })
  })

  describe('findAll', () => {
    it('should return a list of appointments with setters included', async () => {
      const mockAppointments = [
        {
          id: 'appointment1',
          title: 'Appointment 1',
          startTime: new Date(),
          setter: {
            id: 'setter1',
            email: 'setter1@example.com',
            name: 'John Doe',
            contactNumber: '09123456789',
          },
        },
        {
          id: 'appointment2',
          title: 'Appointment 2',
          startTime: new Date(),
          setter: {
            id: 'setter2',
            email: 'setter2@example.com',
            name: 'Jane Doe',
            contactNumber: '09123456789',
          },
        },
      ]

      prismaService.appointment.findMany = jest
        .fn()
        .mockResolvedValue(mockAppointments)

      const result: FindAllAppointmentResponseDto =
        await appointmentsService.findAll()

      expect(prismaService.appointment.findMany).toHaveBeenCalledWith({
        include: { setter: true },
      })
      expect(result).toEqual({ data: mockAppointments })
    })
  })

  describe('updateStatus', () => {
    it('should update the appointment status', async () => {
      const updateAppointmentStatusDto: UpdateAppointmentStatusDto = {
        id: 'appointment-id',
        status: 'Approved',
      }

      prismaService.appointment.update = jest.fn().mockResolvedValue(null) // Mocking successful update

      await appointmentsService.updateStatus(updateAppointmentStatusDto)

      expect(prismaService.appointment.update).toHaveBeenCalledWith({
        where: { id: updateAppointmentStatusDto.id },
        data: { status: updateAppointmentStatusDto.status },
      })
    })

    it('should throw a BadRequestException if the update fails', async () => {
      const updateAppointmentStatusDto: UpdateAppointmentStatusDto = {
        id: 'appointment-id',
        status: 'Approved',
      }

      prismaService.appointment.update = jest
        .fn()
        .mockRejectedValue(new Error('Database error'))

      await expect(
        appointmentsService.updateStatus(updateAppointmentStatusDto),
      ).rejects.toThrow(
        new BadRequestException('Failed to update appointment status'),
      )
    })
  })
})
