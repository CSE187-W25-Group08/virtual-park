import { Lot } from "../../lot";
import { LotService } from "../../lot/service";

export async function getLots(): Promise<Lot[]> {
  return new LotService().getLots()
}