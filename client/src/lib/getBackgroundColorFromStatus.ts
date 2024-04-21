import { AppointmentStatus } from './interface/Appointment'

type StatusColors = '#727d8a' | '#3F83F8' | '#F05252'
export const AppointmentStatusColors: Record<AppointmentStatus, StatusColors> =
  {
    Waiting: '#727d8a',
    Approved: '#3F83F8',
    Rejected: '#F05252',
  }

export const getBackgroundColorFromStatus = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Waiting:
      return AppointmentStatusColors.Waiting
    case AppointmentStatus.Approved:
      return AppointmentStatusColors.Approved
    case AppointmentStatus.Rejected:
      return AppointmentStatusColors.Rejected
  }
}
