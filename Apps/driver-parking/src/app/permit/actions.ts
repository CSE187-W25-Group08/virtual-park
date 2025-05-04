'use server'

import { cookies } from 'next/headers'

import { Permit } from '../../permit'
import { PermitService } from '../../permit/service'

export async function getUserPermits() : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return new PermitService().getPermitByDriver(cookie)
}
