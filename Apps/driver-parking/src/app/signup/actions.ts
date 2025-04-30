'use server'

import { cookies } from 'next/headers'

import { NewUser, User } from '../../auth'
import { signupUser } from '../../auth/service'

export async function signup(user: NewUser) : Promise<User|undefined> {
  const data = await signupUser(user)
  if (data) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    const session = data.accessToken
    const cookieStore = await cookies()
   
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { name: data.name ?? '' }
  }
  return undefined
}