'use server'
import { Enforcement, NewEnforcement } from '../../enforcement'
import { getEnforcementOfficers, createEnforcementOfficer } from '../../enforcement/service'
import { cookies } from 'next/headers'

export async function getEnforcement(): Promise<Enforcement[]> {
  const cookie = (await cookies()).get('session')?.value
  return await getEnforcementOfficers(cookie)
}

export async function createEnforcement(details: NewEnforcement): Promise<Enforcement | undefined> {
  const cookie = (await cookies()).get('session')?.value
  const newOfficer = await createEnforcementOfficer(cookie, details)
  if (newOfficer) {
    return newOfficer
  }

  return undefined
}
