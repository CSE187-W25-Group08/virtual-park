
export async function sendPermitEmailAction(email: string, name: string, metadata: Record<string, unknown>): Promise<void> {
  const permitTypeId = metadata.permitTypeId as string;
  const vehicleId = metadata.vehicleId as string;
  const dataCookie = metadata.cookie as string;
  const price = Number(metadata.price);
  console.log("Permit Type ID:", permitTypeId);
  console.log("VehicleId:", vehicleId);
  console.log("Cookie:", dataCookie);
  console.log("Price:", price);

  //const permit = await sendPermitEmail()
  //console.log(permit)
  console.log("=======Permit Fields=======")

};