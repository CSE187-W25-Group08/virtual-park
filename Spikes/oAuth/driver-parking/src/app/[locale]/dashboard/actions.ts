'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../../permit'
import { getValidPermit } from '../../../permit/service'

export async function getActivePermit() : Promise<Permit | null> {
  const cookie = (await cookies()).get('session')?.value
  return getValidPermit(cookie)
}