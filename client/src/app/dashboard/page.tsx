import { getAppointments } from '../actions'
import DashboardDetail from '@/components/DashboardDetail'

export default async function Login() {
  const appointments = await getAppointments()
  return <DashboardDetail appointments={appointments.data || []} />
}
