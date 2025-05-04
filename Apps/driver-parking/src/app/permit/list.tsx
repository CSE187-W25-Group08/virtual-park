import { getPermitByDriver } from './actions'
import PermitCard from '../permit/card'

export default async function AvailablePermitsPage() {
  const permits = await getPermitByDriver()

  return (
    <div style={{ padding: '1rem' }}>
      {permits.map((permit) => (
        <PermitCard key={permit.type} permit={permit} />
      ))}
    </div>
  )
}