import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Page from '@/app/login/page'
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

it('Login denies invalid credentials', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  // Mock fetch to simulate both login + check API
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/login')) {
      return Promise.resolve({
        status: 401,
        json: () => Promise.resolve(undefined),
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

  await screen.findByText('Incorrect login credentials, please try again');
})