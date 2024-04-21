'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useHooks } from './hooks'
import SetAppointmentDialog from '../SetAppointmentDialog'
import { FormProvider } from 'react-hook-form'
import { Appointment } from '@/lib/interface/Appointment'
import { memo } from 'react'

export type AppointmentDetailProps = {
  appointments: Appointment[]
}

const AppointmentDetail = ({ appointments }: AppointmentDetailProps) => {
  const {
    handleLogin,
    user,
    appointmentDialogOpen,
    handleOpenAppointmentDialog,
    handleCloseAppointmentDialog,
    methods,
    onSubmit,
    events,
    handleGoToDashboard,
  } = useHooks({ appointments })

  return (
    <FormProvider {...methods}>
      <div className='w-full h-16 bg-[#2C3E50] flex items-center justify-between  shadow-sm backdrop-blur-md py-2 px-3 rounded-md'>
        <p className=' font-medium text-xl text-white'>
          Calendar of Appointments
        </p>
        <div className='flex space-x-3'>
          <button
            onClick={handleOpenAppointmentDialog}
            className='bg-amber-500 hover:bg-amber-600 py-2 px-4 text-sm rounded-md'
          >
            Set an appointment
          </button>
          {user ? (
            <button
              onClick={handleGoToDashboard}
              className='bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 text-sm rounded-md'
            >
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className='bg-green-500 text-white hover:bg-green-600 py-2 px-4 text-sm rounded-md'
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className='w-full h-full mt-2'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
        />
      </div>
      <SetAppointmentDialog
        open={appointmentDialogOpen}
        onClose={handleCloseAppointmentDialog}
        onSubmit={onSubmit}
      />
    </FormProvider>
  )
}

export default memo(AppointmentDetail)
