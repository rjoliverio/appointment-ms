import { useEffect, useMemo, useState } from 'react'
import { DashboardDetailProps } from '.'
import { Event } from '@/lib/interface/Event'
import { getBackgroundColorFromStatus } from '@/lib/getBackgroundColorFromStatus'
import { Appointment, AppointmentStatus } from '@/lib/interface/Appointment'

type UseHookParams = DashboardDetailProps
export interface EventInfo {
  event: Pick<Event, 'id'>
}
export const useHooks = ({ appointments }: UseHookParams) => {
  const [selectedEvent, setSelectedEvent] = useState<
    (Appointment & { bgColor: string }) | null
  >(null)
  const dayGridEvents = useMemo<Event[]>(
    () =>
      appointments
        .filter(
          (app) =>
            app.status === AppointmentStatus.Approved ||
            app.status === AppointmentStatus.Waiting,
        )
        .map((app) => ({
          id: app.id,
          title: `${app.title} - ${app.setter.name}`,
          start: new Date(app.startTime),
          backgroundColor: getBackgroundColorFromStatus(app.status),
        })),
    [appointments],
  )
  const events = useMemo<Event[]>(
    () =>
      appointments.map((app) => ({
        id: app.id,
        title: `${app.title} - ${app.setter.name}`,
        start: new Date(app.startTime),
        backgroundColor: getBackgroundColorFromStatus(app.status),
      })),
    [appointments],
  )

  const handleOnClickEvent = (info: EventInfo) => {
    const appointment = appointments.find((app) => app.id === info.event.id)
    if (appointment) {
      const bgColor = getBackgroundColorFromStatus(appointment.status)
      setSelectedEvent({ ...appointment, bgColor })
    }
  }

  useEffect(() => {
    if (appointments && appointments.length) {
      const bgColor = getBackgroundColorFromStatus(appointments[0].status)
      setSelectedEvent({ ...appointments[0], bgColor })
    }
  }, [])

  return {
    dayGridEvents,
    events,
    selectedEvent,
    setSelectedEvent,
    handleOnClickEvent,
  }
}
