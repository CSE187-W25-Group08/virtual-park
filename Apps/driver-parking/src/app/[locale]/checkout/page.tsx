'use client';
// import { TicketId } from "@/ticket";
import View from "./View";
import { useSearchParams } from 'next/navigation'

// For npm build 
// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
// type Params = Promise<{ params: TicketId }>
// https://stackoverflow.com/questions/79145063/params-should-be-awaited-nextjs15
export default function Page(){
  const searchParams = useSearchParams() 
  const type = searchParams.get('type') || ''
  const price = parseFloat(searchParams.get('price') || '0')
  const status = searchParams.get('status') || ''

  return <View type={type} price = {price} status={status}/>;
}