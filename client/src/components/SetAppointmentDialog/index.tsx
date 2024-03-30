import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useHooks } from './hooks'
import { SetAppointmentFormValues } from '../AppointmentDetail/hooks'

type SetAppointmentDialogProps = {
  open: boolean
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: SetAppointmentFormValues) => void
}
const SetAppointmentDialog = ({
  open,
  onClose,
  onSubmit,
}: SetAppointmentDialogProps) => {
  const { register, handleSubmit, errors, handleErrorBorder } = useHooks()
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Set an appointment
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mt-2 flex flex-col space-y-2'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block mb-1 text-sm font-medium text-gray-900 '
                      >
                        Name
                      </label>
                      <input
                        {...register('name')}
                        type='text'
                        id='name'
                        className={`bg-gray-50 border ${handleErrorBorder(
                          !!errors.name,
                        )} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        placeholder='John Doe'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block mb-1 text-sm font-medium text-gray-900 '
                      >
                        Email
                      </label>
                      <input
                        {...register('email')}
                        type='email'
                        id='email'
                        className={`bg-gray-50 border ${handleErrorBorder(
                          !!errors.email,
                        )} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        placeholder='johndoe@example.com'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='contactNumber'
                        className='block mb-1 text-sm font-medium text-gray-900 '
                      >
                        Contact Number
                      </label>
                      <input
                        {...register('contactNumber')}
                        type='text'
                        id='contactNumber'
                        className={`bg-gray-50 border ${handleErrorBorder(
                          !!errors.contactNumber,
                        )} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        placeholder='+63 000 000 0000'
                      />
                      <p
                        id='outlined_error_help'
                        className='mt-1 text-xs text-red-600'
                      >
                        {errors.contactNumber?.message}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor='startTime'
                        className='block mb-2 text-sm font-medium text-gray-900'
                      >
                        Prefered appointment schedule
                      </label>
                      <input
                        {...register('startTime')}
                        type='datetime-local'
                        id='startTime'
                        className={`bg-gray-50 border ${handleErrorBorder(
                          !!errors.startTime,
                        )} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      />
                    </div>
                  </div>

                  <div className='mt-6 flex items-center justify-end space-x-3'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SetAppointmentDialog
