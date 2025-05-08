import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl';

import Signup from '../../src/app/[locale]/signup/Signup'
import { signup } from '../../src/app/[locale]/signup/actions'
import {signup as signupMessages} from '../../messages/en.json'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/[locale]/signup/actions', () => ({
  signup: vi.fn()
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

const mockSignup = signup as ReturnType<typeof vi.fn>

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{signup: signupMessages}}>
      {component}
    </NextIntlClientProvider>
  )
}

it('mocks successful Signup process', async () => {
  const mockPush = vi.fn();

  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  mockSignup.mockResolvedValueOnce({ name: 'Test User' })

  renderWithIntl(<Signup />)

  const email = screen.getByLabelText('Email').querySelector('input')
  const name = screen.getByLabelText('Name').querySelector('input')
  const password = screen.getByLabelText('Password').querySelector('input')
  const signup = screen.getByLabelText('Sign Up')

  if (!email || !name || !password) {
    throw new Error('Input(s) not found')
  }

  fireEvent.change(email, {target: { value: 'example@email.com' }})
  fireEvent.change(name, {target: { value: 'Test User' }})
  fireEvent.change(password, {target: { value: 'password' }})
  fireEvent.click(signup)

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/register')
  })
})

it('mocks unsuccessful Signup process', async () => {
  const mockPush = vi.fn();

  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  mockSignup.mockResolvedValueOnce(undefined)
  // const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});


  renderWithIntl(<Signup />)

  const email = screen.getByLabelText('Email').querySelector('input')
  const name = screen.getByLabelText('Name').querySelector('input')
  const password = screen.getByLabelText('Password').querySelector('input')
  const signup = screen.getByLabelText('Sign Up')

  if (!email || !name || !password) {
    throw new Error('Input(s) not found')
  }
  
  fireEvent.change(email, {target: { value: 'example@email.com' }})
  fireEvent.change(name, {target: { value: 'Test User' }})
  fireEvent.change(password, {target: { value: 'password' }})
  fireEvent.click(signup)

  await screen.findByLabelText('sign up error');
})

it('toggles password visibility', () => {
  renderWithIntl(<Signup />)

  const password = screen.getByLabelText('Password').querySelector('input')
  const togglePassword = screen.getByLabelText('Toggle Password Visibility')

  if (!password) {
    throw new Error('Input(s) not found')
  }

  fireEvent.click(togglePassword)

  expect(password.type).toBe('text')

  fireEvent.click(togglePassword)

  expect(password.type).toBe('password')
})