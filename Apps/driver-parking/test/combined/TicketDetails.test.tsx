import { it, vi, beforeEach, afterEach, expect} from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { graphql, HttpResponse } from 'msw'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/navigation'
import { setupServer } from 'msw/node'

import Page from '../../src/app/[locale]/ticket/[ticketId]/page'
import {paidList, unpaidList, appealedList} from '../testData'
import { ticket_details as ticketDetailsMessages } from '../../messages/en.json'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
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
  })
]

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ ticket_details: ticketDetailsMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Renders Page', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
    const query = body.query || ''
  
    if (query.includes('paidTicket')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { paidTicket: paidList }
        }),
      } as Response)
    }
  
    if (query.includes('unpaidTicket')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { unpaidTicket: unpaidList }
        }),
      } as Response)
    }
  
    if (query.includes('appealedTicket')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { appealedTicket: appealedList }
        }),
      } as Response)
    }
  
    return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any
  renderWithIntl(<Page />)
  const meterTickets = await screen.findAllByText('Expired meter');
  expect(meterTickets.length).toEqual(2);
})