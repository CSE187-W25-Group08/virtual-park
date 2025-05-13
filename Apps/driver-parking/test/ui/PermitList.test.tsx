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
    type: 'Student',
    issueDate: '2025-01-01',
    expDate: '2025-01-01',
    price: 3.14,
  },
  {
    id: '2',
    type: 'Staff',
    issueDate: '2025-01-02',
    expDate: '2025-01-02',
    price: 6.14,
  },
  {
    id: '3',
    type: 'Disabled',
    issueDate: '2025-01-03',
    expDate: '2025-01-03',
    price: 10.14,
  }]
  mockgetUserPermits.mockResolvedValueOnce(testPermits)

  renderWithIntl(<PermitList />)

  await screen.findByText('Student')
})