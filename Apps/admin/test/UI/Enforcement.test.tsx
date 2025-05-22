import { afterEach, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import { testEnforcers } from '../MockData'
import Page from '@/app/enforcement/page'
import EnforcementList from '@/app/enforcement/EnforcementList'

const mockPush = vi.fn()
const mockPathname = "/enforcement"

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

vi.mock('../../src/app/enforcement/actions', () => ({
  getEnforcement: vi.fn(() => testEnforcers),
}))

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

it('Renders', async () => {
  render(<Page />)
  await screen.findByText('Enforcement Officers')
})

it('Renders the list of enforcement officers', async () => {
  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  await screen.findByText('Peter Patrol')
})
