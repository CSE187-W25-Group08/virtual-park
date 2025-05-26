import { issuePermit } from "./service";

export async function setPermitTypePaid(metadata: Record<string, unknown>): Promise<void> {
  const permitTypeId = metadata.permitTypeId as string;
  const vehicleId = metadata.vehicleId as string;
  const dataCookie = metadata.cookie as string;
  console.log("ID:", permitTypeId);
  console.log("VehicleId:", vehicleId);
  console.log("Cookie:", dataCookie);

  await issuePermit(permitTypeId, vehicleId, dataCookie);
  console.log("=======Permit Fields=======")

};