import { it, afterEach, beforeEach, vi, expect} from 'vitest'
import { fireEvent, render, screen, cleanup} from '@testing-library/react'
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl'

import TicketCard from '../../src/app/[locale]/ticket/[ticketId]/Card';
import TicketDetails from '../../src/app/[locale]/ticket/[ticketId]/page';
import View from '../../src/app/[locale]/ticket/[ticketId]/View'

import {
  ticket_details as ticketDetailsMessages,
  labels as labelsMessages,
} from '../../messages/en.json'
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))
vi.mock('../../src/app/[locale]/ticket/actions', () => {
  // Store the mock ticket data
  let mockTicket = {
    id: "e5fd7cb1-75b0-4d23-a7bc-361e2d0621da",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: false,
    appeal: 'null',
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
      };
      return Promise.resolve(mockTicket);
    }),
    setTicketAppealed: vi.fn(() => {
      mockTicket = {
        ...mockTicket,
        appeal: 'submitted',
      }
      return Promise.resolve(mockTicket)
    })
  };
});

vi.mock('../../src/app/[locale]/register/actions', () => {
  return {
    getVehicleById: vi.fn(() =>
      Promise.resolve({
        id: 'v123',
        licensePlate: 'ABC-123',
      })
    )
  }
})

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'mock-session-token' })),
    delete: vi.fn(),
  }),
}))

vi.stubGlobal('scrollTo', vi.fn())

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn((url) => {
    if (url.includes('/auth')) {
      return Promise.resolve(new Response(JSON.stringify({
        id: 'user123',
        email: 'john@example.com',
      }), { status: 200 }));
    }

    if (url.includes('/vehicle')) {
      return Promise.resolve(new Response(JSON.stringify({
        data: {
          primaryVehicle: null,
        },
      }), { status: 200 }));
    }

    return Promise.resolve(new Response(JSON.stringify({}), { status: 404 }));
  }));
});


afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ ticket_details: ticketDetailsMessages, labels: labelsMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('clicking back navigates to /ticket and scrolls to top', () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  
  renderWithIntl(<View ticketId="abc123" />)

  const backButton = screen.getByLabelText('back')
  fireEvent.click(backButton)

  expect(mockPush).toHaveBeenCalledWith('/ticket')
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
})

it('render details page', async () => {
  const page = await TicketDetails({
    params: Promise.resolve({
      locale: 'en',
      ticketId: 'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'
    }),
  });

  renderWithIntl(page);

  await screen.findByText('Expired meter');
});

it('contains Violation Text', async () => {
  renderWithIntl(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByText('Expired meter');
})

it('contains image', async () => {
  renderWithIntl(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
  await screen.findByLabelText('image_e5fd7cb1-75b0-4d23-a7bc-361e2d0621da')
})

// it('contains pay ticket button', async () => {
//   renderWithIntl(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
//   await screen.findByText('Pay Ticket')
// })
// it('Cicking pay ticket button changes ticket status to paid', async () => {
//   const mockPush = vi.fn()
//   vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  
//   renderWithIntl(<TicketCard ticketId = {'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'}/>)
//   const button = await screen.findByText('Pay Ticket')
//   fireEvent.click(button)
//   // screen.debug()
//   await screen.findByText('Paid')
// })

it('Contains button to Appeal Ticket', async () => {
  renderWithIntl(<TicketCard ticketId={'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'} />)
  await screen.findByText('Appeal Ticket')
})

it('Ticket button renders modal', async () => {
  renderWithIntl(<TicketCard ticketId={'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'} />)
  const button = await screen.findByText('Appeal Ticket')
  fireEvent.click(button)
  await screen.findByLabelText('Reason for Appeal')
})

it('Can clear the text within the modal', async () => {
  renderWithIntl(<TicketCard ticketId={'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'} />)
  const button = await screen.findByText('Appeal Ticket')
  fireEvent.click(button)
  const appealField = await screen.findByLabelText('Reason for Appeal')
  await userEvent.type(appealField, 'Fake Reason')
  const clearButton = await screen.findByText('Clear')
  fireEvent.click(clearButton)
  await screen.findByLabelText('Reason for Appeal')
})

it('Closes the modal when pressing outside it', async () => {
  renderWithIntl(<TicketCard ticketId={'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'} />)
  const button = await screen.findByText('Appeal Ticket')
  fireEvent.click(button)
  await userEvent.keyboard('{Escape}')
  const modalText = screen.queryByLabelText('Reason for Appeal')
  expect(modalText).toBeNull()
})

it('Sets ticket appeal status to submitted after an appeal', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<TicketCard ticketId={'e5fd7cb1-75b0-4d23-a7bc-361e2d0621da'} />)
  const button = await screen.findByText('Appeal Ticket')
  fireEvent.click(button)
  const appealField = await screen.findByLabelText('Reason for Appeal')
  await userEvent.type(appealField, 'Fake Reason')
  const submitButton = await screen.findByText('Submit')
  fireEvent.click(submitButton)
  await screen.findByText('submitted')
})