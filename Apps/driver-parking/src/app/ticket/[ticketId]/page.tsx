import { TicketId } from "@/ticket";

export default function TicketDetails({params} : {params: TicketId}) {

  return <h1>{params.ticketId}</h1>
}