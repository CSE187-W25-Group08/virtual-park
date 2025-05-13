'use server'
import { Driver } from '../../driver'
import {
  getAllDrivers,
  // suspendDriverAccount, 
  // reactivateDriverAccount,
} from '../../driver/service'
import { cookies } from 'next/headers'

export async function fetchDrivers(): Promise<Driver[]> {
  const cookie = (await cookies()).get('session')?.value;
  return await getAllDrivers(cookie);
}

// export async function suspendDriver(email: string): Promise<void> {
//   const cookie = (await cookies()).get('session')?.value;
//   await suspendDriverAccount(email, cookie);
// }

// export async function reactivateDriver(email: string): Promise<void> {
//   const cookie = (await cookies()).get('session')?.value;
//   await reactivateDriverAccount(email, cookie);
// }