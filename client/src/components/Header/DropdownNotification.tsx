import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { BellIcon } from '@heroicons/react/24/outline'

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifying, setNotifying] = useState(true)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdown = useRef<any>(null)

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
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <li className='relative'>
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false)
          setDropdownOpen(!dropdownOpen)
        }}
        href='#'
        className='relative flex h-8.5 w-8.5 p-2 items-center justify-center rounded-full border-[0.5px] bg-slate-50 hover:text-primary'
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
          <span className='absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75'></span>
        </span>

        <BellIcon className='h-5 w-5' />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-md border bg-white shadow-sm sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className='px-4 py-3'>
          <h5 className='text-sm font-medium'>Notification</h5>
        </div>

        <ul className='flex h-auto flex-col px-4 overflow-y-auto'>
          <li>
            <Link
              className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
              href='#'
            >
              <p className='text-sm text-gray-500'>
                <span className='text-black dark:text-white'>
                  Edit your information in a swipe
                </span>{' '}
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
              </p>

              <p className='text-xs text-gray-500'>12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default DropdownNotification
