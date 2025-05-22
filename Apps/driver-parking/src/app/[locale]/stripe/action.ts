'use server'

import { getClientSecretService } from "../../../stripe/service";
import { cookies } from 'next/headers'


export async function getClientSecretAction(amount : number): Promise<string> {
  const cookie = (await cookies()).get('session')?.value
  return await getClientSecretService(cookie, amount);
}