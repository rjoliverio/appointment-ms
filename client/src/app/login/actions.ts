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

export async function logout() {
  const token = cookies().get('access_token')
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    },
  )

  if (!response.ok) {
    const jsonResponse = await response.json()
    throw new Error(jsonResponse.message)
  }

  cookies().delete('access_token')
}
