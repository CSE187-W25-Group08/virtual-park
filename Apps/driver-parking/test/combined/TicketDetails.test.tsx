import { it, vi, beforeEach, afterEach, expect} from 'vitest'
import { render, screen, cleanup, act, fireEvent} from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setupServer } from 'msw/node'

import View from '../../src/app/[locale]/ticket/[ticketId]/View'
import TicketList from '../../src/app/[locale]/ticket/list'
import {paidList, unpaidList, appealedList, testTicket} from '../testData'
import {
  ticket_details as ticketDetailsMessages,
  ticket as ticketMessages,
} from '../../messages/en.json'

const mockedPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockedPush,
  })
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'mock-session-token' })),
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
  })
]

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ticket: ticketMessages, ticket_details: ticketDetailsMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Renders list of tickets', async () => {
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
