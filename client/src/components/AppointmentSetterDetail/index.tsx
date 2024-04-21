'use client'

import { UserIcon } from '@heroicons/react/24/solid'

export default function AppointmentSetterDetail() {
  return (
    <div className='flex flex-col space-y-3 bg-blue-500 shadow-sm rounded-md p-5 text-white'>
      <div className='flex items-center space-x-3'>
        <UserIcon className='h-7 w-7' />
        <p className='text-xl font-semibold'>Rj Oliverio</p>
      </div>
      <div className='flex flex-col space-y-1'>
        <p className='font-semibold uppercase text-xs'>E-mail</p>
        <p>rjoliverio@gmail.com</p>
      </div>
      <div className='flex flex-col space-y-1'>
        <p className='font-semibold uppercase text-xs'>Contact Number</p>
        <p>09454250787</p>
      </div>
      <div className='flex flex-col space-y-1'>
        <p className='font-semibold uppercase text-xs'>Schedule</p>
        <p>Thu, April 21, 2024 9:45 AM</p>
      </div>
    </div>
  )
}
