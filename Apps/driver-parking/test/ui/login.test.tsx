import { it, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'

import Login from '../../src/app/login/View'

afterEach(() => {
  cleanup()
})

vi.mock('../../src/app/login/action', () => ({
  signup: vi.fn()
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

it('should render the Login in component', async () => {
  render(<Login />)
  await screen.findByText('Sign in')
})