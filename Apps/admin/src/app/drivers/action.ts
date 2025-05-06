'user server'
import { Vehicle } from '../../vehicle'
import { getAllVehicles } from '../../vehicle/service'
import { cookies } from 'next/headers'

export async function fetchVehicles(): Promise<Vehicle[]> {
  const cookie = (await cookies()).get('session')?.value;
  return await getAllVehicles(cookie);
}