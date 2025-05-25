'use server'

import { getCheckoutSessionUrl } from "../../../stripe/service";
import { cookies } from 'next/headers'


/*
export async function getClientSecretAction(amount : number): Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  return await getClientSecretService(cookie, amount);
}
*/

export async function getCheckoutSessionUrlAction(amount : number, name: string, type: string, id: string, successUrl: string, cancelUrl: string): Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  const sessionUrl = await getCheckoutSessionUrl(cookie, amount, name, type, id, successUrl, cancelUrl);
  return sessionUrl
}