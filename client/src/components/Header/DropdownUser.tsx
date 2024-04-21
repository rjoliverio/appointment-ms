import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid'

const DropdownUser = () => {
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
    <div className='relative'>
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-4'
        href='#'
      >
        <span className='hidden text-right lg:block'>
          <span className='block text-sm font-medium text-black dark:text-white'>
            Thomas Anree
          </span>
          <span className='block text-xs'>UX Designer</span>
        </span>

        <span className='h-12 w-12 rounded-full'>
          <Image
            src={'https://placehold.co/400x400'}
            alt='sample image'
            width={400}
            height={400}
            className='rounded-full bg-clip-content'
          />
        </span>

        <ChevronDownIcon className='w-5 h-5' />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-60 flex-col rounded-lg border bg-white shadow-sm ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <button className='flex items-center text-red-500 gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:bg-red-100'>
          <ArrowLeftStartOnRectangleIcon className='h-5 w-5' />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default DropdownUser
