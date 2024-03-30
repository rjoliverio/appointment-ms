import { useFormContext } from 'react-hook-form'
import { SetAppointmentFormValues } from '../AppointmentDetail/hooks'

export const useHooks = () => {
  const { register, formState, handleSubmit } =
    useFormContext<SetAppointmentFormValues>()
  const { errors } = formState

  const handleErrorBorder = (isError: boolean) => {
    return isError ? 'border-red-300' : 'border-gray-300'
  }
  return {
    register,
    handleSubmit,
    errors,
    handleErrorBorder,
  }
}
