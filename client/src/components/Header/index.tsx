import { Appointment } from '@/lib/interface/Appointment'
import DropdownNotification from './DropdownNotification'
import DropdownUser from './DropdownUser'
import { Bars3Icon } from '@heroicons/react/24/solid'

export interface HeaderProps {
  sidebarOpen: string | boolean | undefined
  // eslint-disable-next-line no-unused-vars
  setSidebarOpen: (arg0: boolean) => void
  appointments: Appointment[]
}

const Header = (props: HeaderProps) => {
  return (
    <header className='sticky top-0 z-40 flex w-full bg-white drop-shadow-1'>
      <div className='flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className='z-50 block p-1.5 lg:hidden'
          >
            <Bars3Icon className='w-5 h-5' />
          </button>
        </div>

        <div className='flex items-center gap-3 '>
          <ul className='flex items-center gap-2'>
            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  )
}

export default Header
