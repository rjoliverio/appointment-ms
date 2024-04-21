'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function FullGridCalendar() {
  const toolbar = {
    right: 'today dayGridWeek,dayGridMonth prev,next',
  }
  return (
    <div className='w-full h-full'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridWeek'
        events={[]}
        headerToolbar={toolbar}
      />
    </div>
  )
}
