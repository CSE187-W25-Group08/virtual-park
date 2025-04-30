import { expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'node:test'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.resetModules()
})

it('renders the Signup Page', async () => {
  vi.doMock('../../../src/app/signup/Signup', () => ({
    __esModule: true,
    default: () => <div data-testid="signup-view">Signup View</div>,
  }))

  const { default: SignupPage } = await import('../../../src/app/signup/page')

  render(<SignupPage />)

  expect(screen.getByTestId('signup-view')).not.toBeNull()
})