'user server'
import { Driver } from '../../driver'
import { getAllDrivers } from '../../driver/service'
import { cookies } from 'next/headers'

export async function fetchDrivers(): Promise<Driver[]> {
  const cookie = (await cookies()).get('session')?.value;
  return await getAllDrivers(cookie);
}