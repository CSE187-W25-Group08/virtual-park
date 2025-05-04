'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../permit'
import { getPermitByDriver, getPermitType } from '../../permit/service'

export async function getUserPermits() : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return getPermitByDriver(cookie)
}

export async function permitTypes() : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return getPermitType(cookie)
}

