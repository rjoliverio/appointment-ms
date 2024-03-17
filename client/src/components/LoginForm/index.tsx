'use client'

import { Controller } from 'react-hook-form'
import { useHooks } from './hooks'

export default function LoginForm() {
  const { control, handleSubmit, onSubmit } = useHooks()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 md:space-y-6'>
      <div>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Your email
        </label>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type='email'
              name='email'
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value}
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              placeholder='name@company.com'
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Password
        </label>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type='password'
              name='password'
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value}
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
            />
          )}
        />
      </div>
      <button
        type='submit'
        className='w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
      >
        Sign in
      </button>
    </form>
  )
}
