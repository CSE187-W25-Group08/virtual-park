import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import { Permit } from '../../src/permit'
import PermitCollapsable from '../../src/app/drivers/[driverId]/permit/Collapsable'
import { getUserPermits } from '../../src/app/permit/action'
import { getPermitByDriver } from '../../src/permit/service'


afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

export const mockPermits: Permit[] = [
  {
    id: '1',
    issueDate: '2025-01-01',
    expDate: '2026-01-01',
    type: 'Residential',
    price: 120
  },
  {
    id: '2',
    issueDate: '2025-03-10',
    expDate: '2025-09-10',
    type: 'Visitor',
    price: 45
  },
  {
    id: '3',
    issueDate: '2024-12-15',
    expDate: '2025-12-15',
    type: 'Commercial',
    price: 300
  },
  {
    id: '4',
    issueDate: '2025-04-20',
    expDate: '2025-10-20',
    type: 'Temporary',
    price: 60
  },
  {
    id: '5',
    issueDate: '2025-02-05',
    expDate: '2026-02-05',
    type: 'Employee',
    price: 100
  }
]


it('should render permit collapsable', async () => {
  vi.mock('../../src/permit/service', () => ({
    getPermitByDriver: vi.fn(() => Promise.resolve(mockPermits))
  }))

  render(<PermitCollapsable driverId='doesntmatter'/>)
  await screen.findByText('Employee')
})