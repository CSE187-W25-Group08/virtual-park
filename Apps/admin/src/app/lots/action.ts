"use server"
import { Lot } from "../../lot";
import { LotService } from "../../lot/service";
import { cookies } from 'next/headers'

export async function getLots(): Promise<Lot[]> {
  const cookie = (await cookies()).get('session')?.value
  const lots = new LotService().getAllLots(cookie);
  console.log('admin lots action returns', lots)
  return lots;
}