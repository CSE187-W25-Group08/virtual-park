import { it, afterEach, vi, expect, beforeEach } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { login as loginMessages } from '../../messages/en.json'
import { login } from '../../src/app/[locale]/login/action'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/[locale]/login/action', () => ({
  login: vi.fn()
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
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        {component}
      </GoogleOAuthProvider>
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

  vi.mocked(login).mockResolvedValue({
  name: 'Anna Admin',
})
  
  renderWithIntl(<Login />)

  const emailInput = screen.getByPlaceholderText('email')
  const passwordInput = screen.getByPlaceholderText('password')
  const button = screen.getByText('Sign In')

  await userEvent.type(emailInput, 'anna@books.com')
  await userEvent.type(passwordInput, 'annaadmin')
  userEvent.click(button)

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })
})

it('shows error message on failed login', async () => {
  vi.mocked(login).mockResolvedValue(undefined)

  renderWithIntl(<Login />)

  const emailInput = screen.getByPlaceholderText('email')
  const passwordInput = screen.getByPlaceholderText('password')
  const signInButton = screen.getByText('Sign In')

  await userEvent.type(emailInput, 'bad@gmail.com')
  await userEvent.type(passwordInput, 'badpassword')
  await userEvent.click(signInButton)

  expect(screen.getByText('Sign In')).toBeDefined()
})

