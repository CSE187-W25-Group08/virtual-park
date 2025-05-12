import { it, afterEach, vi} from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import { Permit } from '../../src/permit'
import VehicleCollapsable from '../../src/app/drivers/[driverId]/vehicle/Collapsable'
import { getUserVehicles } from '../../src/app/vehicle/action'
import { Vehicle } from '../../src/vehicle'


afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    licensePlate: 'ABC1234',
    driver: 'Alice Johnson',
    make: 'Toyota',
    model: 'Corolla',
    color: 'Blue'
  },
  {
    id: 'v2',
    licensePlate: 'XYZ9876',
    driver: 'Bob Smith',
    make: 'Honda',
    model: 'Civic',
    color: 'Black'
  },
  {
    id: 'v3',
    licensePlate: 'LMN4567',
    driver: 'Charlie Davis',
    make: 'Ford',
    model: 'Focus',
    color: 'White'
  }
]



it('should render permit collapsable', async () => {
  vi.mock('../../src/app/vehicle/action', () => ({
    getUserVehicles: vi.fn(() => Promise.resolve(mockVehicles))
  }))

  render(<VehicleCollapsable driverId='doesntmatter'/>)
  await screen.findByText('Honda')
})