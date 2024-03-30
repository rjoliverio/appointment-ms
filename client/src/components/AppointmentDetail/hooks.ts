import { authApi } from '@/lib/hooks/api/authApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as yup from 'yup'
import parsePhoneNumber from 'libphonenumber-js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
  startTime: yup.string().required(),
})

export type SetAppointmentFormValues = yup.InferType<typeof schema>

export const useHooks = () => {
  const router = useRouter()
  const { user } = authApi()
  const [appointmentDialogOpen, setAppointmentDialog] = useState(false)
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const handleLogin = () => {
    router.push('/login')
  }

  const handleCloseAppointmentDialog = () => {
    setAppointmentDialog(false)
  }

  const handleOpenAppointmentDialog = () => {
    setAppointmentDialog(true)
  }

  const onSubmit = (values: SetAppointmentFormValues) => {
    alert(values)
  }

  return {
    handleLogin,
    user,
    appointmentDialogOpen,
    methods,
    onSubmit,
    handleCloseAppointmentDialog,
    handleOpenAppointmentDialog,
  }
}
