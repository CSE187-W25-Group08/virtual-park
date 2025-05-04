'use server'

import { cookies } from 'next/headers'


// import { Vehicle, VehicleForm } from '../../register'
// import {Permit} from '../../permit'
// import { PermitService } from '../../permit/service'

// export async function getPermitByDriver() : Promise<permitType[]> {
//   const cookie = (await cookies()).get('session')?.value
//   return new PermitService().getpermitTypes(cookie)
// }

// export async function registerVehicle(vehicle: VehicleForm) : Promise<Vehicle> {
//   const cookie = (await cookies()).get('session')?.value
//   return new RegisterService().registerVehicle(cookie, vehicle)
// }


import { Permit } from '../../permit'
import { PermitService } from '../../permit/service'

export async function getUserPermits() : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return new PermitService().getPermitByDriver(cookie)
}

