import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
// https://chatgpt.com/g/g-p-6812f0a14ce48191b88ff0acaa65015c-virtual-park-app/c/6812f1f1-1608-8007-a132-0de188c60fc6

// mock next.js stuff navigation and cookies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn()
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

// https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
const testAppeal = {
  id: "a1b2c3d4",
  vehicle: "uuid",
  enforcer: "uuid",
  lot: "uuid",
  paid: false,
  description: "Parked slightly over the white line due to tight spacing.",
  due: "2025-06-15T23:59:59Z",
  issue: "2025-05-10T14:32:00Z",
  violation: "Improper Parking - Line Violation",
  image: "/images/violations/violation123.jpg",
  cost: 45.00,
  appeal: "submitted"
};

import Page from '@/app/page'
import {listAppeals} from '@/app/dashboard/actions';
it('Displays list of active appeals', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url, options) => {
    const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
    const query = body.query || ''
    if (query.includes('activeAppeals')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          data: { activeAppeals: [testAppeal] }
        }),
      } as Response)
    }
    return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any

  render(<Page />)
  await screen.findByText('$45.00');
})


