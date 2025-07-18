'use server'

import { cookies } from 'next/headers'


import { Ticket } from '../../ticket'
// import { Lot } from '../../lot'
import { issueTicketForVehicle } from '../../ticket/service'
// import { getAllLots } from '../../lot/service'
import { getDriver } from '../../auth/service'
// import { Driver } from '../../auth'
import { sendTicketNotification } from '../../email/service'


export async function issueTicketForCar(
  driverId: string,
  vehicleId: string,
  lot: string,
  description: string,
  violation: string,
  image: string,
  cost: number,
  paid: boolean,
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

export async function getDriverDetails(id: string) {
  try {
    const cookie = (await cookies()).get('session')?.value
    const driver = await getDriver(id, cookie)
    return driver
  } catch (error) {
    console.error('Error in getDriverDetails:', error)
    return null
  }
}

export async function sendEmail(
  email: string,
  name: string,
  ticket: Ticket
): Promise<void> {
  return sendTicketNotification(email, name, ticket)
}