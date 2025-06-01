import { issuePermit } from "./service";

export async function setPermitTypePaid(permitTypeId: string, vehicleId: string, dataCookie: string, price: number): Promise<void> {
  console.log("Permit Type ID:", permitTypeId);
  console.log("VehicleId:", vehicleId);
  console.log("Cookie:", dataCookie);
  console.log("Price:", price);

  const permit = await issuePermit(permitTypeId, vehicleId, dataCookie, price);
  console.log(permit)
  console.log("=======Permit Fields=======")

};