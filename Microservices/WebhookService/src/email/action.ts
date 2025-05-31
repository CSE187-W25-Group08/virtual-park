import { sendPermitEmail, sendTicketEmail } from "./service";

export async function sendPermitEmailAction(email : string, name: string, productName: string, costOfProduct: number, permitTypeId: string, vehicleId: string, cookie: string): Promise<void> {
  console.log("Email:", email);
  console.log("Name:", name);
  console.log("ProductName:", productName);
  console.log("Price:", costOfProduct);
  console.log("Permit Type ID:", permitTypeId);
  console.log("VehicleId:", vehicleId);
  console.log("Cookie:", cookie);

  await sendPermitEmail(email, name, productName, costOfProduct, cookie, vehicleId, permitTypeId);
  console.log("=======Permit Fields=======")

};

export async function sendTicketEmailAction(email : string, name: string, productName: string, costOfProduct: number, ticketId: string, cookie: string): Promise<void> {
  console.log("Email:", email);
  console.log("Name:", name);
  console.log("ProductName:", productName);
  console.log("Price:", costOfProduct);
  console.log("Ticket Type ID:", ticketId);
  console.log("Cookie:", cookie);

  await sendTicketEmail(email, name, productName, costOfProduct, cookie, ticketId);
  console.log("=======ticket Fields=======")

};