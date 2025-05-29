import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { testLots } from '../MockData'
// https://chatgpt.com/g/g-p-6812f0a14ce48191b88ff0acaa65015c-virtual-park-app/c/6812f1f1-1608-8007-a132-0de188c60fc6

// mock next.js stuff navigation and cookies
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

import Page from '@/app/lots/page'

it('Displays list of active appeals', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
  const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
  const query = body.query || ''
  if (query.includes('getAll')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        data: { getAll: testLots }
      }),
    } as Response)
  }
  return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any
  render(<Page />)
  await screen.findByText('Student Parking');
})


