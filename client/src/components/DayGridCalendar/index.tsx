'use client'

import { Event } from '@/lib/interface/Event'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventInfo } from '../DashboardDetail/hooks'

interface DayGridCalendarProps {
  events: Event[]
  // eslint-disable-next-line no-unused-vars
  eventClick: (e: EventInfo) => void
}

export default function DayGridCalendar({
  events,
  eventClick,
}: DayGridCalendarProps) {
  return (
    <>
      <FullCalendar
        height={'600px'}
        plugins={[timeGridPlugin]}
        initialView='timeGridDay'
        nowIndicator
        slotMinTime={'07:00:00'}
        slotMaxTime={'19:00:00'}
        events={events}
        eventClick={eventClick}
      />
    </>
  )
}
