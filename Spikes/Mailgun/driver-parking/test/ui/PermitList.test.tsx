import { it, afterEach, vi, expect } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import PermitList from '../../src/app/[locale]/permit/history/PermitList'
import { getUserPermits } from '../../src/app/[locale]/permit/actions'
import { permit_history as permitHistoryMessages } from '../../messages/en.json'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/[locale]/permit/actions', () => ({
  getUserPermits: vi.fn()
}))

const mockgetUserPermits = vi.mocked(getUserPermits)

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ permit_history: permitHistoryMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('mocks PermitList component', async () => {
  const testPermits = [{
    id: '1',
    type: 'Daily',
    issueDate: '2025-01-01',
    expDate: '2025-01-01',
    price: 5,
  },
  {
    id: '2',
    type: 'Week',
    issueDate: '2025-01-02',
    expDate: '2025-01-08',
    price: 27,
  },
  {
    id: '3',
    type: 'Month',
    issueDate: '2025-01-03',
    expDate: '2025-02-03',
    price: 90,
  },
  {
    id: '4',
    type: 'Year',
    issueDate: '2025-01-04',
    expDate: '2026-01-04',
    price: 515.95,
  }]
  mockgetUserPermits.mockResolvedValueOnce(testPermits)

  renderWithIntl(<PermitList />)

  await screen.findByText('Daily')
})