'use server'

import { cookies } from 'next/headers'


import { Permit, PermitType } from '../../../permit'
import { getPermitByDriver, getPermitType, fetchBuyablePermits } from '../../../permit/service'

export async function getBuyablePermits(): Promise<PermitType[]> {
  console.log(" getBuyablePermits called")
  const cookie = (await cookies()).get('session')?.value
  const permitTypes = await fetchBuyablePermits(cookie);
  return permitTypes;
}

export async function getUserPermits(): Promise<Permit[]> {
  console.log("get user permits action called");
  const cookie = (await cookies()).get('session')?.value
  return await getPermitByDriver(cookie)
}

export async function permitTypes(): Promise<PermitType[]> {
  console.log("get permit types action called");
  const cookie = (await cookies()).get('session')?.value
  return await getPermitType(cookie)
}

