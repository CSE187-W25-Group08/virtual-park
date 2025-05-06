import { it, afterEach, vi } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'

import PermitList from '../../src/app/[locale]/permit/history/PermitList'
import { getUserPermits } from '../../src/app/[locale]/permit/actions'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/[locale]/permit/actions', () => ({
  getUserPermits: vi.fn()
}))

const mockgetUserPermits = vi.mocked(getUserPermits)

it('mocks PermitList component', async () => {
  const testPermits = [{
    type: 'Student',
    issueDate: '2025-01-01',
    expDate: '2025-01-01',
    price: 3.14,
  },
  {
    type: 'Staff',
    issueDate: '2025-01-02',
    expDate: '2025-01-02',
    price: 6.14,
  }]
  mockgetUserPermits.mockResolvedValueOnce(testPermits)

  render(<PermitList />)

  await screen.findByText('Student')
})