'use server'


import { Vehicle } from '../../driver'
import { VehicleService } from '../../vehicle/service'

export async function getUserVehicles(jwt: string) : Promise<Vehicle[]> {
  return new VehicleService().getUserVehicles(jwt)
}