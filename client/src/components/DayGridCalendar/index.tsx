'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function DayGridCalendar() {
  return (
    <>
      <FullCalendar
        height={'600px'}
        plugins={[timeGridPlugin]}
        initialView='timeGridDay'
        nowIndicator
        slotMinTime={'07:00:00'}
        slotMaxTime={'19:00:00'}
        events={[
          {
            title: 'sample',
            start: new Date(),
          },
        ]}
      />
    </>
  )
}
