import { Setter } from './Setter'

export interface Appointment {
  id: string
  isApproved: boolean
  startTime: string
  endTime: string | null
  title: string
  setter: Setter
}

export interface FindAllAppointmentsResponse {
  data?: Appointment[]
}
