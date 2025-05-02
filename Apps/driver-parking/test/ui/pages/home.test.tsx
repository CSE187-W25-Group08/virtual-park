import { expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'node:test'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.resetModules()
})

it('renders the Home Page', async () => {
  vi.doMock('../../../src/app/landing/Landing', () => ({
    __esModule: true,
    default: () => <div data-testid="home-view">Home View</div>,
  }))

  const { default: HomePage } = await import('../../../src/app/page')

  render(<HomePage />)

  expect(screen.getByTestId('home-view')).not.toBeNull()
})