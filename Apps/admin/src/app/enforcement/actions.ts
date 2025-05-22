'use server'
import { Enforcement } from '../../enforcement'
import { getEnforcementOfficers } from '../../enforcement/service'
import { cookies } from 'next/headers'

export async function getEnforcement(): Promise<Enforcement[]> {
  const cookie = (await cookies()).get('session')?.value
  return await getEnforcementOfficers(cookie)
}
