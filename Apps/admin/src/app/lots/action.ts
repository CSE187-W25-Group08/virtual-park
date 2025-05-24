import { Lot } from "../../lot";
import { LotService } from "../../lot/service";

export async function getLots(): Promise<Lot[]> {
  const lots = new LotService().getLots();
  console.log("admin lot action get lots", lots);
  return lots;
}