import { authApi } from '@/lib/hooks/api/authApi'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import * as yup from 'yup'
import parsePhoneNumber from 'libphonenumber-js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAppointment } from '@/app/actions'
import { toast } from 'react-toastify'
import { AppointmentDetailProps } from '.'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  contactNumber: yup
    .string()
    .required()
    .test(
      'check if number is possible',
      'Contact number is not valid',
      function (value) {
        return parsePhoneNumber(value, 'PH')?.isValid() || false
      },
    ),
  title: yup.string().required(),
  startTime: yup.string().required(),
})

export type SetAppointmentFormValues = yup.InferType<typeof schema>
type UseHookParams = AppointmentDetailProps

export const useHooks = ({ appointments }: UseHookParams) => {
  const router = useRouter()
  const { user } = authApi()
  const [appointmentDialogOpen, setAppointmentDialog] = useState(false)
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      title: 'CLIENT',
    },
  })

  const events = useMemo(() => {
    return appointments.map((app) => ({
      title: app.title,
      start: new Date(app.startTime),
    }))
  }, [appointments])

  const handleLogin = () => {
    router.push('/login')
  }

  const handleCloseAppointmentDialog = () => {
    setAppointmentDialog(false)
  }

  const handleOpenAppointmentDialog = () => {
    setAppointmentDialog(true)
  }

  const onSubmit = async (values: SetAppointmentFormValues) => {
    try {
      await createAppointment(values)
      toast.success('Appointment sent for approval.')
      handleCloseAppointmentDialog()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return {
    handleLogin,
    user,
    appointmentDialogOpen,
    methods,
    events,
    onSubmit,
    handleCloseAppointmentDialog,
    handleOpenAppointmentDialog,
  }
}
