import { expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'node:test'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.resetModules()
})

it('renders the Login Page', async () => {
  vi.doMock('../../../src/app/login/View', () => ({
    __esModule: true,
    default: () => <div data-testid="loginView">Login View</div>,
  }))

  const { default: LoginPage } = await import('../../../src/app/login/page')

  render(<LoginPage />)

  expect(screen.getByTestId('loginView')).not.toBeNull()
})