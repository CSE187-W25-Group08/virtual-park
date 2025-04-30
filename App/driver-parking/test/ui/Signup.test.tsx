import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import Signup from '../../src/app/signup/Signup'
import { signup } from '../../src/app/signup/actions'

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/signup/actions', () => ({
  signup: vi.fn()
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

const mockSignup = signup as ReturnType<typeof vi.fn>

it('mocks successful Signup process', async () => {
  const mockPush = vi.fn();

  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  mockSignup.mockResolvedValueOnce({ name: 'Test User' })

  render(<Signup />)

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
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})

it('mocks unsuccessful Signup process', async () => {
  const mockPush = vi.fn();

  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  mockSignup.mockResolvedValueOnce(undefined)
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});


  render(<Signup />)

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
    expect(alertMock).toHaveBeenCalledWith('This email has already been taken.')
  })
})