import { it, vi, beforeEach, afterEach, expect} from 'vitest'
import { render, screen, cleanup, act, fireEvent, waitFor} from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setupServer } from 'msw/node'

import View from '../../src/app/[locale]/ticket/[ticketId]/View'
import TicketList from '../../src/app/[locale]/ticket/list'
import AppealModal from '../../src/app/[locale]/ticket/[ticketId]/AppealModal'
import {paidList, unpaidList, appealedList, testTicket, testTicketAppealed, testVehicle} from '../testData'
import {
  labels as labelMessages,
  ticket_details as ticketDetailsMessages,
  ticket as ticketMessages,
} from '../../messages/en.json'
import userEvent from '@testing-library/user-event'

const mockedPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockedPush,
  })
}))

const mockedGetCookies = vi.fn()
vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: mockedGetCookies,
    delete: vi.fn(),
  }),
}))

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// https://mswjs.io/docs/network-behavior/graphql/
export const handlers = [
  graphql.query('paidTicket', () => {
    return HttpResponse.json({
      data: {
        paidTicket: paidList,
      },
    })
  }),
  graphql.query('unpaidTicket', () => {
    return HttpResponse.json({
      data: {
        unpaidTicket: unpaidList,
      },
    })
  }),
  graphql.query('appealedTicket', () => {
    return HttpResponse.json({
      data: {
        appealedTicket: appealedList,
      },
    })
  }),
  graphql.query('ticketId', () => {
    return HttpResponse.json({
      data: {
        ticketId: testTicket,
      },
    })
  }),
  graphql.query('getVehicleById', () => {
    return HttpResponse.json({
      data: {
        getVehicleById: testVehicle,
      }
    })
  }),
  graphql.mutation('setTicketAppealed', () => {
    return HttpResponse.json({
      data: {
        setTicketAppealed: testTicketAppealed,
      }
    })
  }),
]

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{
      ticket: ticketMessages,
      ticket_details: ticketDetailsMessages,
      labels: labelMessages,
    }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Renders list of tickets', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })

  vi.stubGlobal('fetch', vi.fn((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {};
    const query = body.query || '';

    if (query.includes('paidTicket')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { paidTicket: paidList } }),
      });
    }

    if (query.includes('unpaidTicket')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { unpaidTicket: unpaidList } }),
      });
    }

    if (query.includes('appealedTicket')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { appealedTicket: appealedList } }),
      });
    }

    return Promise.reject(new Error('Unhandled GraphQL query'));
  }));

  renderWithIntl(<TicketList />)
  await screen.findByText(/Paid Violations/)
  fireEvent.click(screen.getByRole('button', { name: /Expired meter again/ }))
  expect(mockedPush).toHaveBeenCalledWith('ticket/t5')
})

it('Renders ticket details page', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })

  vi.stubGlobal('fetch', vi.fn((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {};
    const query = body.query || '';

    if (query.includes('getVehicleById')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { getVehicleById: testVehicle } }),
      });
    }

    if (query.includes('ticketId')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { ticketId: testTicket } }),
      });
    }

    return Promise.reject(new Error('Unhandled GraphQL query'));
  }));

  renderWithIntl(<View ticketId={'t3'}/>)
  await screen.findByText(/Did not pay/)
})

it('Appeals a ticket successfully', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })

  vi.stubGlobal('fetch', vi.fn((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {};
    const query = body.query || '';

    if (query.includes('ticketId')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { ticketId: testTicket } }),
      });
    }

    if (query.includes('getVehicleById')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { getVehicleById: testVehicle } }),
      });
    }

    if (query.includes('setTicketAppealed')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { setTicketAppealed: testTicketAppealed } }),
      });
    }

    return Promise.reject(new Error('Unhandled GraphQL query'));
  }));

  renderWithIntl(<View ticketId={'t3'}/>)
  await screen.findByText('Appeal Ticket')
  fireEvent.click(screen.getByText('Appeal Ticket'))
  const appealField = await screen.findByLabelText('Reason for Appeal')
  await userEvent.type(appealField, 'That\'s not me')
  const submitButton = await screen.findByText('Submit')
  fireEvent.click(submitButton)
  waitFor(() => {
    expect(mockedPush).toHaveBeenCalledWith('/ticket')
  })
})

it('No tickets are rendered as all requests fail', async () => {
  mockedGetCookies.mockImplementation(() => {
    throw new Error('NO COOKIE')
  })

  renderWithIntl(<TicketList />)
  await screen.findAllByText(/No current violations on file/)
})

it('Does not render a details page when the request fails', async () => {
  mockedGetCookies.mockImplementation(() => {
    throw new Error('NO COOKIE')
  })

  renderWithIntl(<View ticketId={'t3'}/>)
  await screen.findByText(/View Ticket/)
  expect(screen.queryByText(/Appeal Ticket/)).toBeNull()
})

it('Cannot appeal the ticket when the request fails', async () => {
  // From ChatGPT, will add link later
  let cookieCallCount = 0
  mockedGetCookies.mockImplementation(() => {
    cookieCallCount++
    if (cookieCallCount < 3) {
      return { value: 'mock-session-token' }
    }

    throw new Error('NO COOKIE')
  })

  vi.stubGlobal('fetch', vi.fn((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {};
    const query = body.query || '';

    if (query.includes('ticketId')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { ticketId: testTicket } }),
      });
    }

    if (query.includes('getVehicleById')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: { getVehicleById: testVehicle } }),
      });
    }

    return Promise.reject(new Error('Unhandled GraphQL query'));
  }));

  renderWithIntl(<View ticketId={'t3'}/>)
  await screen.findByText('Appeal Ticket')
  fireEvent.click(screen.getByText('Appeal Ticket'))
  const appealField = await screen.findByLabelText('Reason for Appeal')
  await userEvent.type(appealField, 'That\'s not me')
  const submitButton = await screen.findByText('Submit')
  fireEvent.click(submitButton)
  waitFor(() => {
    expect(mockedPush).not.toHaveBeenCalledWith('/ticket')
  })
})
