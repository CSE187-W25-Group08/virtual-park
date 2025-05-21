import { it, afterEach, vi, expect, beforeEach, } from 'vitest' 
import { render, screen, cleanup, act} from '@testing-library/react'
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
// https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
function mockFetchGraphQL(overrides: Record<string, any> = {}) {
  vi.mocked(fetch).mockImplementation((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {};
    const query = body.query || '';

    const match = (keyword: string) => query.includes(keyword);

    if (match('getTicketInfo')) {
      testTicket.appeal = 'submitted'
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { getTicketInfo: overrides.getTicketInfo || testTicket }
        }),
      } as Response);
    }

    if (match('getLotById')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { getLotById: overrides.getLotById || { name: 'test lot' } }
        }),
      } as Response);
    }

    if (match('getAnyVehicleById')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { getAnyVehicleById: overrides.getAnyVehicleById || { licensePlate: 'test plate' } }
        }),
      } as Response);
    }

    if (match('approveAppeal')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: {
            approveAppeal: {
              ...testTicket,
              appeal: "approved"
            }
          }
        }),
      } as Response);
    }

    if (match('rejectAppeal')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: {
            rejectAppeal: {
              ...testTicket,
              appeal: "rejected"
            }
          }
        }),
      } as Response);
    }

    return Promise.reject(new Error('Unhandled GraphQL query'));
  }) as any;
}

import TicketView from '@/app/ticket/[ticketId]/view';


it('Displays Ticket Details with correct lot', async () => { 
  mockFetchGraphQL();
  render(<TicketView ticketId = "mockid" />)
  await screen.findByText('test lot');
})

it('Displays Ticket Details with correct licenseplate', async () => { 
  mockFetchGraphQL();
  render(<TicketView ticketId = "mockid" />)
  await screen.findByText('License Plate: test plate');
})

it('Admin approves appeal', async () => {
  mockFetchGraphQL();
  render(<TicketView ticketId = "mockid" />)
  const approveButton = await screen.findByText("Approve Appeal");
  await userEvent.click(approveButton);
  await screen.findByText("Appeal: approved");
})

it('Admin approves appeal', async () => {
  testTicket.appeal = "rejected";
  mockFetchGraphQL();
  render(<TicketView ticketId = "mockid" />)
  const rejectButton = await screen.findByText("Reject Appeal");
  await userEvent.click(rejectButton);
  await screen.findByText('Appeal: rejected');
})
