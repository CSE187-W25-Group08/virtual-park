'use server'

import { getCheckoutSessionUrl } from "../../../stripe/service";
import { cookies } from 'next/headers'

export async function getCheckoutSessionUrlAction(amount : number, name: string, metadata: Record<string, unknown>, successUrl: string, cancelUrl: string): Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  const sessionUrl = await getCheckoutSessionUrl(cookie, amount, name, metadata, successUrl, cancelUrl);
  return sessionUrl
}