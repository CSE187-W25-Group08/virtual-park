'use server'

import { cookies } from 'next/headers'

import { Vehicle, VehicleForm } from '../../../register'
import { RegisterService } from '../../../register/service'

export async function getUserVehicles() : Promise<Vehicle[]> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().getUserVehicles(cookie)
}

export async function getVehicleById(vehicleId: string) : Promise<Vehicle> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().getVehicleById(cookie, vehicleId)
}

export async function registerVehicle(vehicle: VehicleForm) : Promise<Vehicle> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().registerVehicle(cookie, vehicle)
}

export async function getPrimaryVehicle() : Promise<Vehicle | undefined> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().getPrimaryVehicle(cookie)
}

export async function updatePrimaryVehicle(vehicle: Vehicle) : Promise<Vehicle> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().updatePrimaryVehicle(cookie, vehicle)
}

export async function editVehicle(vehicle: Vehicle | null) : Promise<Vehicle> {
  const cookie = (await cookies()).get('session')?.value
  return new RegisterService().editVehicle(cookie, vehicle)
}