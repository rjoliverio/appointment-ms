'use client'

import AppointmentSetterDetail from '@/components/AppointmentSetterDetail'
import DayGridCalendar from '@/components/DayGridCalendar'
import FullGridCalendar from '@/components/FullGridCalendar'
import { Appointment } from '@/lib/interface/Appointment'
import { useHooks } from './hooks'
import { memo } from 'react'

export interface DashboardDetailProps {
  appointments: Appointment[]
}

const DashboardDetail = ({ appointments }: DashboardDetailProps) => {
  const { dayGridEvents, events, selectedEvent, handleOnClickEvent } = useHooks(
    { appointments },
  )

  return (
    <div className='flex flex-row w-full h-full space-x-3'>
      <div className='flex flex-col items-center max-w-lg w-full h-full space-y-4'>
        <div className='flex w-full overflow-x-hidden overflow-y-auto flex-col min-h-[600px] h-full'>
          <DayGridCalendar
            events={dayGridEvents}
            eventClick={handleOnClickEvent}
          />
        </div>
        <div className='w-full h-full'>
          {selectedEvent && (
            <AppointmentSetterDetail selectedAppointment={selectedEvent} />
          )}
        </div>
      </div>
      <FullGridCalendar events={events} eventClick={handleOnClickEvent} />
    </div>
  )
}
export default memo(DashboardDetail)
