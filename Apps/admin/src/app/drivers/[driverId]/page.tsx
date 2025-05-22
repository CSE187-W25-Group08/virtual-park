import DriverDetailsView from "./View";
// For npm build 
// https://stackoverflow.com/questions/79113322/nextjs-react-type-does-not-satisfy-constraint
// type Params = Promise<{ params: TicketId }>
// https://stackoverflow.com/questions/79145063/params-should-be-awaited-nextjs15
export default async function DriverDetailsPage({params}: {params: Promise<{ driverId: string }>;}) {
  const { driverId } = await params;
  return (
    <DriverDetailsView driverId={driverId} />
  )
}