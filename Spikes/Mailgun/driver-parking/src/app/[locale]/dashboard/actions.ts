'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../../permit'
import { getValidPermit } from '../../../permit/service'
import { sendSimpleMessage } from '../../../email/service'

export async function getActivePermit() : Promise<Permit | null> {
  const cookie = (await cookies()).get('session')?.value
  return getValidPermit(cookie)
}

export async function sendSimpleEmail() {
  await sendSimpleMessage()
}