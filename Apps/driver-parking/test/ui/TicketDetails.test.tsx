import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'

import TicketView from '../../src/app/ticket/[ticketId]/View';

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))
vi.mock('../../src/app/ticket/actions', () => ({
  getTicketById: vi.fn(() => ({
    id: "e5fd7cb1-75b0-4d23-a7bc-361e2d0621da",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: true,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "Expired meter",
    image: "/images/tickets/t2.jpg",
    cost: 50.02
  }))
}));

it('contains Violation Text', async () => {
  render(<TicketView ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByText('Expired meter');
})

it('contains image', async () => {
  render(<TicketView ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByLabelText('image_e5fd7cb1-75b0-4d23-a7bc-361e2d0621da')
})