'use server'

import { cookies } from 'next/headers'


import { Permit, PermitType } from '../../../permit'
import { getPermitByDriver, getPermitType } from '../../../permit/service'

export async function getUserPermits() : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return getPermitByDriver(cookie)
}

export async function permitTypes() : Promise<PermitType[]> {
  const cookie = (await cookies()).get('session')?.value
  return getPermitType(cookie)
}

