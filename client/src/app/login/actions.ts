'use server'

import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
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

  setAuthCookie(response)
}

export async function logout() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(),
      },
    },
  )

  if (!response.ok) {
    const jsonResponse = await response.json()
    throw new Error(jsonResponse.message)
  }

  cookies().delete('access_token')
}

export const getHeaders = () => ({
  Cookie: cookies().toString(),
})

const baseURL = process.env.NEXT_PUBLIC_API_URL
export const authFetcher = async (url: string) => {
  return await fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: {
      ...getHeaders(),
    },
  })
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie')
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1]
    cookies().set({
      name: 'Authentication',
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }
}
