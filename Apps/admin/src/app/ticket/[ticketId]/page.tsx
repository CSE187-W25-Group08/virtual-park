import TicketView from "./view";

export default async function Ticket({params}: {params: Promise<{ ticketId: string }>;}) {
  const {ticketId} = await params;
  return (
    <TicketView ticketId={ticketId} />
  );
}