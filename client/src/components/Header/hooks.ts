import { authApi } from '@/lib/hooks/api/authApi'
import { useEffect, useRef, useState } from 'react'

export const useHooks = () => {
  const { user, isLoading: isUserLoading } = authApi()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdown = useRef<any>(null)

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
  }
}
