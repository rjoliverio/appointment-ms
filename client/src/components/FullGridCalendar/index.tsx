'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Event } from '@/lib/interface/Event'
import { EventInfo } from '../DashboardDetail/hooks'

interface FullGridCalendarProps {
  events: Event[]
  // eslint-disable-next-line no-unused-vars
  eventClick: (e: EventInfo) => void
}
export default function FullGridCalendar({
  events,
  eventClick,
}: FullGridCalendarProps) {
  const toolbar = {
    right: 'today dayGridWeek,dayGridMonth prev,next',
  }
  return (
    <div className='w-full h-full'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridWeek'
        events={events}
        headerToolbar={toolbar}
        eventClick={eventClick}
      />
    </div>
  )
}
