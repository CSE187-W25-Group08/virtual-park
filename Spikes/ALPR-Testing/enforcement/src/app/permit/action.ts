'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../permit'
import { getPermitByPlate } from '../../permit/service'

export async function getpermitByPlateNum(carPlate: string) : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return getPermitByPlate(cookie, carPlate)
}