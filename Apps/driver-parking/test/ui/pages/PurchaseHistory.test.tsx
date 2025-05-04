import { expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'node:test'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.resetModules()
})

it('renders the Permit Purchase History Page', async () => {
  vi.doMock('../../../src/app/permit/history/PermitList', () => ({
    __esModule: true,
    default: () => <div data-testid="purchase-history-view">Purchase History View</div>,
  }))

  const { default: PurchaseHistoryPage } = await import('../../../src/app/permit/history/page')

  render(<PurchaseHistoryPage />)

  expect(screen.getByTestId('purchase-history-view')).not.toBeNull()
})