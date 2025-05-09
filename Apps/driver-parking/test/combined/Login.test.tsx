import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import { login as loginMessages } from '../../messages/en.json'
import Page from '../../src/app/[locale]/login/page'
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

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ login: loginMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

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

  renderWithIntl(<Page />)

  await userEvent.type(screen.getByPlaceholderText('email'), 'anna@books.com')
  await userEvent.type(screen.getByPlaceholderText('password'), 'annaadmin')
  await userEvent.click(screen.getByText('Sign In'))

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/register')
  })
})

it('denies invalid login credentials', async () => {
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

  renderWithIntl(<Page />)

  await userEvent.type(screen.getByPlaceholderText('email'), 'anna@books.com')
  await userEvent.type(screen.getByPlaceholderText('password'), 'annaadmin')
  await userEvent.click(screen.getByText('Sign In'))

  expect(mockPush).not.toHaveBeenCalledWith('/register')
})