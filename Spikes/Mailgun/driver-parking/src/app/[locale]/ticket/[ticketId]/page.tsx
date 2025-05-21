'use server';
// import { TicketId } from "@/ticket";
import View from "./View";

// For npm build 
// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
// type Params = Promise<{ params: TicketId }>
// https://stackoverflow.com/questions/79145063/params-should-be-awaited-nextjs15
export default async function TicketDetails({
  params,
}: {
  params: Promise<{ locale: string; ticketId: string }>;
}) {
  const { ticketId } = await params;
  return <View ticketId={ticketId} />;
}