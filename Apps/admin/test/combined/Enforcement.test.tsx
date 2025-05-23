import { it, afterEach, vi, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'

import EnforcementList from '@/app/enforcement/EnforcementList'
import { testEnforcers } from '../MockData'

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

it('Fetch the correct list of enforcers', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/enforcement')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(testEnforcers),
      } as Response)
    }

    return Promise.reject('Unknown fetch')
  })

  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  await screen.findByText('Peter Patrol')
})
