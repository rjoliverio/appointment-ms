import { logout } from '@/app/login/actions'
import { authApi } from '@/lib/hooks/api/authApi'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export const useHooks = () => {
  const router = useRouter()
  const { user, isLoading: isUserLoading } = authApi()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdown = useRef<any>(null)

  const handleLogoutUser = async () => {
    try {
      await logout()
      toast.success('User logged out')
      router.push('/login')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    if (user) document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  return {
    user,
    isUserLoading,
    trigger,
    setDropdownOpen,
    dropdownOpen,
    dropdown,
    handleLogoutUser,
  }
}
