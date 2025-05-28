'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../permit'
import { getPermitByPlate, recognizePlateFromImage } from '../../permit/service'
import { getVehicleByPlate } from '../../vehicle/service'

export async function getpermitByPlateNum(carPlate: string) : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  const permit = await getPermitByPlate(cookie, carPlate)
  return permit
}

export async function googleVision(base64Image: string) : Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  return recognizePlateFromImage(cookie, base64Image)
}


export async function getDriverFromVehiclePlate(plate: string): Promise<string> {
  try {
    const cookie = (await cookies()).get('session')?.value
    const vehicle = await getVehicleByPlate(cookie, plate)
    if (!vehicle.driver) {
      return ''
    }
    return vehicle.driver
  } catch (error) {
    console.error('Error in getDriverFromVehiclePlate:', error)
    return ''
  }
}