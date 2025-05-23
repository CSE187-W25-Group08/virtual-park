import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import { testEnforcers } from '../MockData'
import Page from '@/app/enforcement/page'
import EnforcementList from '@/app/enforcement/EnforcementList'
import userEvent from '@testing-library/user-event'

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

it('Opens the creation modal', async () => {
  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  const addButton = await screen.findByText(/Add new enforcement officer/)
  fireEvent.click(addButton)
  await screen.findByText('Submit')
})

it('Closes the creation modal when clicking away from it', async () => {
  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  const addButton = await screen.findByText(/Add new enforcement officer/)
  fireEvent.click(addButton)
  await screen.findByText('Submit')
  await userEvent.keyboard(`{Escape}`) 
  const submit = screen.queryByText('Submit')
  expect(submit).toBeNull()
})
