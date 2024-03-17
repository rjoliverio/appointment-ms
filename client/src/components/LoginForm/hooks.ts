import { login } from '@/app/login/actions'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

export type LoginFormData = {
  email: string
  password: string
}
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})
export const useHooks = () => {
  const router = useRouter()
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      toast.success('Login successful.')
      router.push('/')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
  }
}
