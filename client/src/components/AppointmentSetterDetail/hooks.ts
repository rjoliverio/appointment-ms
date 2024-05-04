import { updateAppointmentStatus } from '@/app/actions'
import { Appointment, AppointmentStatus } from '@/lib/interface/Appointment'
import { toast } from 'react-toastify'

type UseHookParams = {
  appointment: Appointment
}
export const useHooks = ({ appointment }: UseHookParams) => {
  const handleUpdateAppointmentStatus = async (status: AppointmentStatus) => {
    try {
      await updateAppointmentStatus({ id: appointment.id, status })
      toast.success(`Appointment ${status}`)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
  return { handleUpdateAppointmentStatus }
}
