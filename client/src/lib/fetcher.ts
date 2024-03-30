import { getCookie } from 'cookies-next'

const token = getCookie('access_token')
const baseURL = process.env.NEXT_PUBLIC_API_URL
export const authFetcher = (url: string) =>
  fetch(`${baseURL}${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())
