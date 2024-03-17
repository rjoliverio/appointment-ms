'use server'

import { cookies } from 'next/headers'
import { LoginFormData } from '@/components/LoginForm/hooks'

export async function login(data: LoginFormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )
  const jsonResponse = await response.json()

  if (!response.ok) throw new Error(jsonResponse.message)

  cookies().set('access_token', jsonResponse.accessToken)
}
