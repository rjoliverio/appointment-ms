'use client'

import { Appointment } from '@/lib/interface/Appointment'
import { UserIcon } from '@heroicons/react/24/solid'
import moment from 'moment'

interface AppointmentSetterDetailProps {
  selectedAppointment: Appointment & { bgColor: string }
}

export default function AppointmentSetterDetail({
  selectedAppointment,
}: AppointmentSetterDetailProps) {
  return (
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
  )
}
