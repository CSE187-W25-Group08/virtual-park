'use server'

import { cookies } from 'next/headers'


import { Permit } from '../../permit'
import { getPermitByPlate, recognizePlateFromImage } from '../../permit/service'

export async function getpermitByPlateNum(carPlate: string) : Promise<Permit[]> {
  const cookie = (await cookies()).get('session')?.value
  return getPermitByPlate(cookie, carPlate)
}

export async function googleVision(base64Image: string) : Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  return recognizePlateFromImage(cookie, base64Image)
}