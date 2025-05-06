import { it, afterEach, vi, expect, beforeEach } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'

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

it('should render the Login in component', async () => {
  render(<Login />)
  expect(screen.getByText('Sign in')).toBeDefined()
})

it('should handle input changes correctly', async () => {
  render(<Login />)

  const emailInput = screen.getByPlaceholderText('Email Address')
  const passwordInput = screen.getByPlaceholderText('Password')

  await userEvent.type(emailInput, 'anna@books.com')
  await userEvent.type(passwordInput, 'annaadmin')

  expect(emailInput).toBeDefined()
})

it('should call login function when button is clicked', async () => {
  const mockPush = vi.fn();
  
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  
  render(<Login />)

  const emailInput = screen.getByPlaceholderText('Email Address')
  const passwordInput = screen.getByPlaceholderText('Password')
  const button = screen.getByText('Sign in')

  await userEvent.type(emailInput, 'molly@books.com')
  await userEvent.type(passwordInput, 'mollymember')
  userEvent.click(button)

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/register')
  })
})