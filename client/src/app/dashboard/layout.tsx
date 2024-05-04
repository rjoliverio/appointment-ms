import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { getAppointments } from '../actions'

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const appointments = await getAppointments()
  return (
    <DefaultLayout appointments={appointments.data || []}>
      {children}
    </DefaultLayout>
  )
}
