import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Page from '@/app/login/page'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it('should call login and redirect on valid credentials', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  // Mock fetch to simulate both login + check API
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/login')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ name: 'Anna Admin', accessToken: 'abcd1234' }),
      } as Response)
    }
    if (url?.toString().includes('/check')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  render(<Page />)

  await userEvent.type(screen.getByPlaceholderText('Email Address'), 'anna@books.com')
  await userEvent.type(screen.getByPlaceholderText('Password'), 'annaadmin')
  await userEvent.click(screen.getByText('Sign in'))

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
