'use server'

import { cookies } from 'next/headers'

import { Credentials, User } from '../../../auth'
import { authenticate, googleAuthenticate } from '../../../auth/service'

export async function login(credential: Credentials): Promise<User | undefined> {
  const user = await authenticate(credential)
  if (user) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    const session = user.accessToken
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { name: user.name }
  }
  return undefined
}

export async function loginWithGoogle(credential: string): Promise<User | undefined> {
  const user = await googleAuthenticate(credential)
  if (user) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    const session = user.accessToken
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { name: user.name }
  }
  return undefined
}
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
