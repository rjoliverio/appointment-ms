'use server'

import { SetAppointmentFormValues } from '@/components/AppointmentDetail/hooks'
import { FindAllAppointmentsResponse } from '@/lib/interface/Appointment'
import { revalidatePath } from 'next/cache'

export async function createAppointment(data: SetAppointmentFormValues) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) {
    const jsonResponse = await response.json()
    throw new Error(jsonResponse.message)
  }

  revalidatePath('/')
}

export async function getAppointments() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  const jsonResponse = await response.json()
  if (!response.ok) {
    throw new Error(jsonResponse.message)
  }
  return jsonResponse as FindAllAppointmentsResponse
}
