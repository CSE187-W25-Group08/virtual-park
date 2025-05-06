import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import SignupPage from '../../src/app/[locale]/signup/page'
import { signup as signupMessages } from '../../messages/en.json'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  }))
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
    <NextIntlClientProvider locale="en" messages={{signup: signupMessages}}>
      {component}
    </NextIntlClientProvider>
  )
}

it('should call signup and redirect on valid credentials', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/signup')) {
      return Promise.resolve({
        status: 201,
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

  renderWithIntl(<SignupPage />)

  await userEvent.type(screen.getByPlaceholderText('Email'), 'anna@books.com')
  await userEvent.type(screen.getByPlaceholderText('Name'), 'Anna Admin')
  await userEvent.type(screen.getByPlaceholderText('Password'), 'annaadmin')
  await userEvent.click(screen.getByText('Sign Up'))

  await vi.waitFor(() => {
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith('/register')
  })
})

it('denies existing credentials', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/signup')) {
      return Promise.resolve({
        status: 409,
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

  renderWithIntl(<SignupPage />)

  await userEvent.type(screen.getByPlaceholderText('Email'), 'anna@books.com')
  await userEvent.type(screen.getByPlaceholderText('Name'), 'Anna Admin')
  await userEvent.type(screen.getByPlaceholderText('Password'), 'annaadmin')
  await userEvent.click(screen.getByText('Sign Up'))

  const router = useRouter();
  expect(router.push).not.toHaveBeenCalledWith('/register')
})