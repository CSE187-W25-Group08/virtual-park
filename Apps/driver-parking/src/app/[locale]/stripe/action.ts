'use server'

import { getCheckoutSessionUrl } from "../../../stripe/service";
import { cookies } from 'next/headers'


/*
export async function getClientSecretAction(amount : number): Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  return await getClientSecretService(cookie, amount);
}
*/

export async function getCheckoutSessionUrlAction(amount : number, productName: string, successUrl: string, cancelUrl: string): Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  const sessionUrl = await getCheckoutSessionUrl(cookie, amount, productName, successUrl, cancelUrl);
  return sessionUrl
}