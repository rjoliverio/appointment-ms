'use client'

import { Appointment, AppointmentStatus } from '@/lib/interface/Appointment'
import { CheckIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import moment from 'moment'
import { useHooks } from './hooks'

interface AppointmentSetterDetailProps {
  selectedAppointment: Appointment & { bgColor: string }
}

export default function AppointmentSetterDetail({
  selectedAppointment,
}: AppointmentSetterDetailProps) {
  const { handleUpdateAppointmentStatus } = useHooks({
    appointment: selectedAppointment,
  })
  return (
    <div className='flex flex-col space-y-2'>
      <div
        className={`flex flex-col space-y-3 bg-[${selectedAppointment.bgColor}] shadow-sm rounded-md p-5 text-white`}
      >
        <div className='flex items-center space-x-3'>
          <UserIcon className='h-7 w-7' />
          <p className='text-xl font-semibold'>
            {selectedAppointment.setter.name}
          </p>
        </div>
        <div className='flex flex-col space-y-1'>
          <p className='font-semibold uppercase text-xs'>E-mail</p>
          <p>{selectedAppointment.setter.email}</p>
        </div>
        <div className='flex flex-col space-y-1'>
          <p className='font-semibold uppercase text-xs'>Contact Number</p>
          <p>{selectedAppointment.setter.contactNumber}</p>
        </div>
        <div className='flex flex-col space-y-1'>
          <p className='font-semibold uppercase text-xs'>Schedule</p>
          <p>
            {moment(new Date(selectedAppointment.startTime)).format(
              'dddd, MMMM Do YYYY, h:mm A',
            )}
          </p>
        </div>
      </div>
      {selectedAppointment.status === AppointmentStatus.Waiting && (
        <div className='flex justify-between items-center space-x-2'>
          <button
            onClick={() =>
              handleUpdateAppointmentStatus(AppointmentStatus.Approved)
            }
            className='py-2 px-3 w-full flex space-x-2 items-center justify-center bg-blue-500 rounded-md text-white'
          >
            <CheckIcon className='h-4 w-4' />
            <span>Approve</span>
          </button>
          <button
            onClick={() =>
              handleUpdateAppointmentStatus(AppointmentStatus.Rejected)
            }
            className='py-2 px-3 w-full flex space-x-2 items-center justify-center bg-red-500 rounded-md text-white'
          >
            <XMarkIcon className='h-4 w-4' />
            <span>Decline</span>
          </button>
        </div>
      )}
    </div>
  )
}
