'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../permit'
import { getPermitByPlate, recognizePlateFromImage } from '../../permit/service'
import { getVehicleByPlate, UnregisterVehicle } from '../../vehicle/service'
import { UnregisterVeh } from '@/vehicle'
import { getAllLots } from '../../lot/service'
import { Lot } from '../../lot/index'

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

export async function UnregisteredVehicle(carPlate: string) : Promise<UnregisterVeh> {
  const cookie = (await cookies()).get('session')?.value
  const vehicleID = await UnregisterVehicle(cookie, carPlate)
  return vehicleID
}

export async function getallLots(): Promise<Lot[]> {
  console.log("enforcement get all lots action called");
  const cookie = (await cookies()).get('session')?.value
  return getAllLots(cookie)
}

