import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import {http, HttpResponse} from 'msw';
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

const testDriver = {
  name: "Testy Tim",
  email: "tim@test.com",
  jwt: "test id",
  joinDate: "Feb 17 2025",
}
import Page from '@/app/drivers/page'

it('Displays list of drivers', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/drivers')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve([testDriver]),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  render(<Page />)
  await screen.findByText('Testy Tim');
})


