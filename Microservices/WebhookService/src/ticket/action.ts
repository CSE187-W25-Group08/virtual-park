import { setTicketPaid } from "./service";

export async function setTicketPaidAction(metadata: Record<string, unknown>): Promise<void> {
  const dataId = metadata.id as string;
  const dataCookie = metadata.cookie as string;
  const ticket =  await setTicketPaid(dataId, true, dataCookie);
  console.log("=======Ticket Fields=======")
  console.log("ID:", dataId);
  console.log("Cookie:", dataCookie);
  if (ticket) {
    console.log("Ticket paid successfully:", ticket);
  }

};