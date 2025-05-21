import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { testTicket } from '../MockData'

const mockPush = vi.fn()
const mockPathname = "/drivers/123";

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

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

import TicketView from '@/app/ticket/[ticketId]/view';


it('Displays Ticket Details', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
  const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
  const query = body.query || ''
  if (query.includes('getTicketInfo')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        data: { getTicketInfo: testTicket }
      }),
    } as Response)
  }
  return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any
  render(<TicketView ticketId = "mockid" />)
  await screen.findByText('submitted');
})