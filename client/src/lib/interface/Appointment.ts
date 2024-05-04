/* eslint-disable no-unused-vars */
import { Setter } from './Setter'

export enum AppointmentStatus {
  Approved = 'Approved',
  Waiting = 'Waiting',
  Rejected = 'Rejected',
}
export interface Appointment {
  id: string
  status: AppointmentStatus
  startTime: string
  endTime: string | null
  title: string
  setter: Setter
  createdAt: string
  updatedAt: string
}

export interface FindAllAppointmentsResponse {
  data?: Appointment[]
}
