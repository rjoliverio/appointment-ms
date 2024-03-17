import LoginForm from '@/components/LoginForm'

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-5 bg-gray-100'>
      <div className='w-full m-auto bg-gray-50 rounded-lg shadow sm:max-w-lg'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
            Sign in to your account
          </h1>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
