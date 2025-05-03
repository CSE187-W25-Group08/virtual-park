import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'

import TicketList from '../../src/app/ticket/list'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/ticket/actions', () => ({
  list: vi.fn(() => [      
    {
      id: "t2",
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

it('contains expired meter violation', async () => {
    render(<TicketList/>)
    await screen.findByText('4/25/2025');
})

it('contains ticket deductible', async () => {
    render(<TicketList/>)
    await screen.findByText('$50.02');
})