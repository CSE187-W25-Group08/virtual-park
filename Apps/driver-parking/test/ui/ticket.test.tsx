import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'

import TicketList from '../../src/app/ticket/list'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/ticket/actions', () => ({
  list: vi.fn(() => [      
    {
      id: "t2",
      vehicle: "XYZ5678",
      enforcer: "E456",
      lot: "Lot B",
      status: "paid",
      description: "Expired meter",
      due: "2025-04-28T23:59:59Z",
      issue: "2025-04-25T09:00:00Z",
      violation: "Expired Meter",
      image: "/images/tickets/t2.jpg",
    }])
}))

it('contains Violation Text', async () => {
  render(<TicketList/>)
  const violationTexts = screen.getAllByText('Violation');
  expect(violationTexts).toHaveLength(2);
})

it('contains Paid Text', async () => {
    render(<TicketList/>)
    screen.getByText('Paid');
})

it('contains expired meter violation', async () => {
    render(<TicketList/>)
    await screen.findByText('Expired meter');
})

/*
it('contains ticket deductible', async () => {
    render(<TicketList/>)
    await screen.findByText('$50.24');
})
*/