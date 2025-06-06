import { it, afterEach, vi, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import Marketing from '../../src/app/landing/Marketing'
import { landing as landingMessages } from '../../messages/en.json'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/[locale]/login/action', () => ({
  logout: vi.fn()
}))

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ landing: landingMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('renders Marketing Page', async () => {
  renderWithIntl(<Marketing />)
  await screen.findByText('Welcome to the Virtual Park')
})

it('mocks clicking Log in button', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Marketing />)
  const loginButton = await screen.findByText('Log In')
  fireEvent.click(loginButton)
  expect(mockPush).toHaveBeenCalledWith('/login')
})

it('mocks clicking Sign Up button', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Marketing />)
  const signupButton = await screen.findByText('Sign Up')
  fireEvent.click(signupButton)
  expect(mockPush).toHaveBeenCalledWith('/signup')
})