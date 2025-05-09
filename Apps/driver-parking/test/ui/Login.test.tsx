import { it, afterEach, vi, expect, beforeEach } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import { login as loginMessages } from '../../messages/en.json'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/[locale]/login/action', () => ({
  login: () => Promise.resolve({ name: 'Anna Admin', accessToken: '1234' })
}))

import Login from '../../src/app/[locale]/login/View'

afterEach(() => {
  cleanup()
  window.sessionStorage.clear()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ login: loginMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('should render the Login in component', async () => {
  renderWithIntl(<Login />)
  expect(screen.getByText('Sign In')).toBeDefined()
})

it('should handle input changes correctly', async () => {
  renderWithIntl(<Login />)

  const emailInput = screen.getByPlaceholderText('email')
  const passwordInput = screen.getByPlaceholderText('password')

  await userEvent.type(emailInput, 'anna@books.com')
  await userEvent.type(passwordInput, 'annaadmin')

  expect(emailInput).toBeDefined()
})

it('should call login function when button is clicked', async () => {
  const mockPush = vi.fn();
  
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  
  renderWithIntl(<Login />)

  const emailInput = screen.getByPlaceholderText('email')
  const passwordInput = screen.getByPlaceholderText('password')
  const button = screen.getByText('Sign In')

  await userEvent.type(emailInput, 'molly@books.com')
  await userEvent.type(passwordInput, 'mollymember')
  userEvent.click(button)

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/register')
  })
})