'use server'

import { getClientSecretService } from "../../../stripe/service";


export async function getClientSecretAction(amount : number): Promise<string> {
  return await getClientSecretService(amount);
}