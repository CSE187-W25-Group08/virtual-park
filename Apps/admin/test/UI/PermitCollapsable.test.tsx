import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import { Permit } from '../../src/permit'
import PermitCollapsable from '../../src/app/drivers/[driverId]/permit/Collapsable'
import { getUserPermits } from '../../src/app/permit/action'


afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

export const mockPermits: Permit[] = [
  {
    issueDate: '2025-01-01',
    expDate: '2026-01-01',
    type: 'Residential',
    price: 120
  },
  {
    issueDate: '2025-03-10',
    expDate: '2025-09-10',
    type: 'Visitor',
    price: 45
  },
  {
    issueDate: '2024-12-15',
    expDate: '2025-12-15',
    type: 'Commercial',
    price: 300
  },
  {
    issueDate: '2025-04-20',
    expDate: '2025-10-20',
    type: 'Temporary',
    price: 60
  },
  {
    issueDate: '2025-02-05',
    expDate: '2026-02-05',
    type: 'Employee',
    price: 100
  }
]


it('should render permit collapsable', async () => {
  vi.mock('../../src/app/permit/action', () => ({
    getUserPermits: vi.fn(() => Promise.resolve(mockPermits))
  }))

  render(<PermitCollapsable driverId='doesntmatter'/>)
  await screen.findByText('Employee')
})