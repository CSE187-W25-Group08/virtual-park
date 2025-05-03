import { TicketId } from "@/ticket";
import View from "./View";

// https://stackoverflow.com/questions/79145063/params-should-be-awaited-nextjs15
export default async function TicketDetails({params} : {params: TicketId}) {
  const param = await params;
  const ticketId = await param.ticketId

  return <View ticketId = {ticketId}/>
}