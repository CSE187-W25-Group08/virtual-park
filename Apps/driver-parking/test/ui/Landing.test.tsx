import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import Landing from '../../src/app/landing/Landing'
import { logout } from '../../src/app/[locale]/login/action'
import { landing as landingMessages } from '../../messages/en.json'

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

const mockLogout = logout as ReturnType<typeof vi.fn>

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ landing: landingMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('mocks clicking login button', () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Landing />)
  const loginButton = screen.getByText('Login')
  fireEvent.click(loginButton)
  expect(mockPush).toHaveBeenCalledWith('/login')
})

it('mocks clicking signup button', () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Landing />)
  const signupButton = screen.getByText('Sign Up')
  fireEvent.click(signupButton)
  expect(mockPush).toHaveBeenCalledWith('/signup')
})

it('mocks clicking logout button', () => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { reload: vi.fn() }
  })
  window.sessionStorage.setItem('name', 'Test User')
  renderWithIntl(<Landing />)
  const logoutButton = screen.getByText('Logout')
  fireEvent.click(logoutButton)
  expect(mockLogout).toHaveBeenCalled()
})
