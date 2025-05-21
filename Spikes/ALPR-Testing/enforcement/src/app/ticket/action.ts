'use server'

import { cookies } from 'next/headers'


import {Ticket} from '../../permit'
import {issueTicketForVehicle} from '../../permit/service'

export async function issueTicketForCar(
  driverId: string,
  vehicleId: string,
  lot: string,
  description: string,
  violation: string,
  image: string,
  cost: number,
  paid: boolean
): Promise<Ticket> {
  const cookie = (await cookies()).get('session')?.value
  return issueTicketForVehicle(
    cookie,
    driverId,
    vehicleId,
    lot,
    description,
    violation,
    image,
    cost,
    paid
  )
}