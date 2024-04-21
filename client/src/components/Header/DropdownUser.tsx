import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid'
import { useHooks } from './hooks'

const DropdownUser = () => {
  const {
    user,
    isUserLoading,
    trigger,
    setDropdownOpen,
    dropdownOpen,
    dropdown,
  } = useHooks()

  if (isUserLoading) return null

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
            {user?.setter.name}
          </span>
          <span className='block text-xs'>Stylist</span>
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
