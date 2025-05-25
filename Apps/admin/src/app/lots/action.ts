import { Lot } from "../../lot";
import { LotService } from "../../lot/service";

export async function getLots(): Promise<Lot[]> {
  const lots = new LotService().getLots();
  return lots;
}