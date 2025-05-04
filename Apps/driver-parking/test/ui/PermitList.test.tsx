import { it, afterEach, vi } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'

import PermitList from '../../src/app/permit/history/PermitList'
import { getUserPermits } from '../../src/app/permit/actions'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/permit/actions', () => ({
  getUserPermits: vi.fn()
}))

const mockgetUserPermits = getUserPermits as ReturnType<typeof vi.fn>

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