import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import Landing from '../../src/app/landing/Landing'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

it('mocks clicking login button', () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  render(<Landing />)
  const loginButton = screen.getByText('Login')
  fireEvent.click(loginButton)
  expect(mockPush).toHaveBeenCalledWith('/login')
})

it('mocks clicking signup button', () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  render(<Landing />)
  const signupButton = screen.getByText('Sign Up')
  fireEvent.click(signupButton)
  expect(mockPush).toHaveBeenCalledWith('/signup')
})