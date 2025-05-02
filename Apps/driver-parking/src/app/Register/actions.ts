'use server'

import { cookies } from 'next/headers'

import { Vehicle } from '../../register'
import { RegisterService } from '../../register/service'

export async function getUserVehicles() : Promise<Vehicle[]> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().getUserVehicles(cookie)
}
