import TicketView from "./view";

export default async function Ticket({params}: {params: Promise<{ ticketId: string }>;}) {
  const {ticketId} = await params;
  console.log("ticket id", ticketId)
  return (
    <TicketView ticketId={ticketId} />
  );
}