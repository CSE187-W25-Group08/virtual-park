'use server'

import { cookies } from 'next/headers'


import { Permit, PermitType } from '../../../permit'
import { getValidPermit, getFuturePermit, getSpecificDailyPermit } from '../../../permit/service'

export async function getActivePermit() : Promise<Permit[] | null> {
  const cookie = (await cookies()).get('session')?.value
  return getValidPermit(cookie)
}

export async function getUserFuturePermit() : Promise<Permit[] | null> {
  const cookie = (await cookies()).get('session')?.value
  return getFuturePermit(cookie)
}

export async function getDailyPermitType(driverClass: string): Promise<PermitType | null> {
  const cookie = (await cookies()).get('session')?.value
  return getSpecificDailyPermit(cookie, driverClass)
}
