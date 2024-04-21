import AppointmentSetterDetail from '@/components/AppointmentSetterDetail'
import DayGridCalendar from '@/components/DayGridCalendar'
import FullGridCalendar from '@/components/FullGridCalendar'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

export default function Login() {
  return (
    <DefaultLayout>
      <div className='flex flex-row w-full h-full space-x-3'>
        <div className='flex flex-col items-center max-w-lg w-full h-full space-y-4'>
          <div className='flex w-full overflow-x-hidden overflow-y-auto flex-col min-h-[600px] h-full'>
            <DayGridCalendar />
          </div>
          <div className='w-full h-full'>
            <AppointmentSetterDetail />
          </div>
        </div>
        <FullGridCalendar />
      </div>
    </DefaultLayout>
  )
}
