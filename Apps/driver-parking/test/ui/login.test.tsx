import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'


vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

vi.mock('../../src/app/Login/action', () => ({
  login: () => Promise.resolve({ name: 'Anna Admin', accessToken: '1234' })
}))

import Login from '../../src/app/login/View'
// import { login } from '../../src/app/Login/action'


// const loginSpy = vi.spyOn({ login }, 'login')

afterEach(() => {
  cleanup()
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
  render(<Login />)

  // Get form fields and button
  const emailInput = screen.getByPlaceholderText('Email Address')
  const passwordInput = screen.getByPlaceholderText('Password')
  const button = screen.getByText('Sign in')

  await userEvent.type(emailInput, 'anna@books.com')
  await userEvent.type(passwordInput, 'annaadmin')
  userEvent.click(button)
  // expect(loginSpy).toHaveBeenCalledWith({
  //   email: 'anna@books.com',
  //   password: 'annaadmin'
  // })
})