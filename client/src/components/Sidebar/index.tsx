'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

interface SidebarProps {
  sidebarOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trigger = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sidebar = useRef<any>(null)

  const storedSidebarExpanded = 'true'

  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col text-white overflow-y-hidden bg-[#1C2434] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
        <p className='font-bold text-xl py-5'>AppointmentMS</p>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'
        >
          <ArrowLeftIcon className='w-4 h-4' />
        </button>
      </div>

      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className=' px-4 py-4 lg:mt-9 lg:px-6'>
          <div>
            <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>
              MENU
            </h3>

            <ul className='mb-6 flex flex-col gap-1.5'>
              <li>
                <Link
                  href='/dashboard'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out`}
                >
                  <Squares2X2Icon className='w-5 h-5' />
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

export default Sidebar
