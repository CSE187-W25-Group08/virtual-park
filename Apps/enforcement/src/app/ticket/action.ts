'use server'

import { cookies } from 'next/headers'


import {Ticket} from '../../ticket'
import {Lot} from '../../lot'
import {issueTicketForVehicle} from '../../ticket/service'
import {getAllLots} from '../../lot/service'

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

export async function getallLots(): Promise<Lot[]> {
  const cookie = (await cookies()).get('session')?.value
  return getAllLots(cookie)
}