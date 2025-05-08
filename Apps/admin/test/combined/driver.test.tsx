import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Page from '@/app/page'
import {http, HttpResponse} from 'msw';
// https://chatgpt.com/g/g-p-6812f0a14ce48191b88ff0acaa65015c-virtual-park-app/c/6812f1f1-1608-8007-a132-0de188c60fc6

// mock next.js stuff navigation and cookies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(),
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

import {fetchDrivers} from '@/app/drivers/action';
it('should call login and redirect on valid credentials', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/drivers')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve([testDriver]),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })


  const drivers = await fetchDrivers();
  // render(<Page />)
  expect(drivers[0]).toEqual(testDriver);
  // await screen.findByText('Testy Tim');
})


