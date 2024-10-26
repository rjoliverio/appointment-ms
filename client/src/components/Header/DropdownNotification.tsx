import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { BellIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import { useNotifications } from '@/lib/hooks/api/notificationsApi'
import { useInView } from 'react-intersection-observer'

const DropdownNotification = () => {
  const {
    notifications,
    isLoading,
    refetchCursor,
    nextCursor,
    isValidating,
    resetCursor,
    mutate,
  } = useNotifications()
  const isNotificationLoading = isValidating || isLoading
  const { ref, inView } = useInView()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifying, setNotifying] = useState(true)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropdown = useRef<any>(null)

  useEffect(() => {
    if (inView && !isNotificationLoading) refetchCursor()
  }, [inView, isNotificationLoading])

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
      resetCursor()
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    if (dropdownOpen) mutate({ data: [], nextCursor: undefined })
  }, [dropdownOpen])

  return (
    <li className='relative'>
      <Link
        ref={trigger}
        onClick={async () => {
          resetCursor()
          setNotifying(false)
          setDropdownOpen(!dropdownOpen)
        }}
        href='#'
        className='relative flex h-8.5 w-8.5 p-2 items-center justify-center rounded-full border-[0.5px] bg-slate-50 hover:text-primary'
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
          <span className='absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75'></span>
        </span>

        <BellIcon className='h-5 w-5' />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute mt-2.5 flex max-h-96 overflow-y-auto flex-col rounded-md border bg-white shadow-sm sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className='py-3 sticky px-4 top-0 bg-white border-b'>
          <h5 className='text-sm font-medium'>Notification</h5>
        </div>

        <ul className='flex h-auto px-4 flex-col divide-y'>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <Link
                className='flex flex-col gap-2.5 px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
                href={notification.link}
              >
                <p className='text-sm text-gray-500'>
                  <span className='text-black dark:text-white'>
                    {notification.title}
                  </span>{' '}
                  {notification.description}
                </p>

                <p className='text-xs text-gray-500'>
                  {moment(new Date(notification.createdAt)).fromNow()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {!isNotificationLoading && !nextCursor && (
          <p className='px-4 flex w-full items-center justify-center mt-1 text-xs text-gray-400'>
            End of notifications
          </p>
        )}
        {!isNotificationLoading && (
          <span style={{ visibility: 'hidden' }} ref={ref}>
            intersection observer marker
          </span>
        )}
      </div>
    </li>
  )
}

export default DropdownNotification
