import { it, afterEach, vi} from 'vitest'
import { fireEvent, render, screen, cleanup} from '@testing-library/react'

import TicketCard from '../../src/app/ticket/[ticketId]/Card';

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))
vi.mock('../../src/app/ticket/actions', () => {
  // Store the mock ticket data
  let mockTicket = {
    id: "e5fd7cb1-75b0-4d23-a7bc-361e2d0621da",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: false,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "Expired meter",
    image: "/images/tickets/t2.jpg",
    cost: 50.02
  };

  return {
    getTicketById: vi.fn(() => Promise.resolve(mockTicket)),
    setTicketPaid: vi.fn(() => {
      mockTicket = {
        ...mockTicket,
        paid: true,
        description: "dragon"
      };
      console.log(mockTicket)
      return Promise.resolve({ success: true });
    })
  };
});




it('contains Violation Text', async () => {
  render(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByText('Violation: Expired meter');
})

it('contains image', async () => {
  render(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByLabelText('image_e5fd7cb1-75b0-4d23-a7bc-361e2d0621da')
})

it('contains pay ticket button', async () => {
  render(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByText('Pay Ticket')
})
it('Cling pay ticket button changes ticket status to paid', async () => {
  render(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  const button = await screen.findByText('Pay Ticket')
  fireEvent.click(button)
  screen.debug()
  await screen.findByText('Paid')

  
})