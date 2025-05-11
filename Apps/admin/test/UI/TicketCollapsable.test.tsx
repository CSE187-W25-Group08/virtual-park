import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import TicketCollapsable from '../../src/app/drivers/[driverId]/ticket/Collapsable'
import { Ticket } from '../../src/ticket'
import { listAll } from '../../src/app/ticket/action'


afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

export const mockTickets: Ticket[] = [
  {
    id: '1',
    vehicle: 'ABC123',
    enforcer: 'John Doe',
    lot: 'Lot A',
    paid: false,
    description: 'Test 1',
    due: '2025-06-01',
    issue: '2025-05-01',
    violation: 'No Parking',
    image: '/images/ticket1.jpg',
    cost: 75,
    appeal: 'Pending'
  },
  {
    id: '2',
    vehicle: 'XYZ789',
    enforcer: 'Jane Smith',
    lot: 'Lot B',
    paid: true,
    description: 'Expired meter.',
    due: '2025-03-15',
    issue: '2025-03-01',
    violation: 'Expired Meter',
    image: '/images/ticket2.jpg',
    cost: 50,
    appeal: 'None'
  }
]


it('should render ticket collapsable', async () => {
  vi.mock('../../src/app/ticket/action', () => ({
    listAll: vi.fn(() => Promise.resolve(mockTickets))
  }))

  render(<TicketCollapsable driverId='doesntmatter'/>)
  await screen.findByText('Test 1')
})