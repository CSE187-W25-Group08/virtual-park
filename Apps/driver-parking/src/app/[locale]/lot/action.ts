"use server"
import { getAllLots } from "../../../lot/service"
import { Lot } from "../../../lot/"

export async function getLots(): Promise<Lot[]> {
  const lots = await getAllLots();
  return lots;
}