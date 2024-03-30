import AppointmentDetail from '@/components/AppointmentDetail'
import { getAppointments } from './actions'

export default async function Home() {
  const appointments = await getAppointments()
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-5 bg-gray-100'>
      <AppointmentDetail appointments={appointments.data || []} />
    </main>
  )
}
