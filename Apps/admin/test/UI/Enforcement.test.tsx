import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { newEnforcer, testEnforcers } from '../MockData'
import Page from '@/app/enforcement/page'
import EnforcementList from '@/app/enforcement/EnforcementList'
import CreationModal from '@/app/enforcement/CreationModal'

const mockPush = vi.fn()
const mockPathname = "/enforcement"

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  vi.resetAllMocks()
})

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

vi.mock('../../src/app/enforcement/actions', () => ({
  getEnforcement: vi.fn(),
  createEnforcement: vi.fn(),
}))

import { getEnforcement, createEnforcement } from '../../src/app/enforcement/actions'

const mockedGetEnforcement = vi.mocked(getEnforcement, { partial: true })
const mockedCreateEnforcement = vi.mocked(createEnforcement, { partial: true })

it('Renders', async () => {
  render(<Page />)
  await screen.findByText('Enforcement Officers')
})

it('Renders the list of enforcement officers', async () => {
  mockedGetEnforcement.mockResolvedValue(testEnforcers)
  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  await screen.findByText('Peter Patrol')
})

it('Opens the creation modal', async () => {
  mockedGetEnforcement.mockResolvedValue(testEnforcers)
  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  const addButton = await screen.findByText(/Add new enforcement officer/)
  fireEvent.click(addButton)
  await screen.findByText('Submit')
})

it('Closes the creation modal when clicking away from it', async () => {
  mockedGetEnforcement.mockResolvedValue(testEnforcers)
  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  const addButton = await screen.findByText(/Add new enforcement officer/)
  fireEvent.click(addButton)
  await screen.findByText('Submit')
  await userEvent.keyboard(`{Escape}`) 
  const submit = screen.queryByText('Submit')
  expect(submit).toBeNull()
})

it('Clears the filled in text', async () => {
  render(
    <CreationModal 
      open={true}
      onClose={vi.fn()}
      onSubmit={vi.fn()}
    />
  )

  const nameInput = await screen.findByLabelText(/New Officer Name/)
  const idInput = await screen.findByLabelText(/New Officer ID/)
  const emailInput = await screen.findByLabelText(/New Officer Email/)
  const passwordInput = await screen.findByLabelText(/Set Password/)
  const confirmInput = await screen.findByLabelText(/Confirm Password/)
  await userEvent.type(nameInput, newEnforcer.name)
  await userEvent.type(idInput, newEnforcer.enforcementId)
  await userEvent.type(emailInput, newEnforcer.email)
  await userEvent.type(passwordInput, newEnforcer.password)
  await userEvent.type(confirmInput, newEnforcer.password)

  fireEvent.click(screen.getByText('Clear'))

  expect(screen.queryByText(newEnforcer.name)).toBeNull()
}, 10000)

it('Calls createEnforcement with the correct details', async () => {
  mockedGetEnforcement.mockResolvedValue(testEnforcers)
  mockedCreateEnforcement.mockResolvedValue(newEnforcer)
  render(<EnforcementList />)
  let alertCalled = false
  window.alert = () => (alertCalled = true)
  await screen.findByText('Edna Enforcer')
  const addButton = await screen.findByText(/Add new enforcement officer/)
  fireEvent.click(addButton)
  await screen.findByText('Submit')

  const nameInput = await screen.findByLabelText(/New Officer Name/)
  const idInput = await screen.findByLabelText(/New Officer ID/)
  const emailInput = await screen.findByLabelText(/New Officer Email/)
  const passwordInput = await screen.findByLabelText(/Set Password/)
  const confirmInput = await screen.findByLabelText(/Confirm Password/)
  await userEvent.type(nameInput, newEnforcer.name)
  await userEvent.type(idInput, newEnforcer.enforcementId)
  await userEvent.type(emailInput, newEnforcer.email)
  await userEvent.type(passwordInput, newEnforcer.password)
  await userEvent.type(confirmInput, newEnforcer.password)

  fireEvent.click(screen.getByText('Submit'))
  await waitFor(() => {
    expect(mockedCreateEnforcement).toHaveBeenCalledWith({
      name: newEnforcer.name,
      enforcementId: newEnforcer.enforcementId,
      email: newEnforcer.email,
      password: newEnforcer.password
    })
  })
}, 10000)

it('Pops up an alert when creating an existing officer account', async () => {
  mockedGetEnforcement.mockResolvedValue(testEnforcers)
  mockedCreateEnforcement.mockResolvedValue(undefined)

  render(<EnforcementList />)
  let alertCalled = false
  window.alert = () => (alertCalled = true)
  await screen.findByText('Edna Enforcer')
  const addButton = await screen.findByText(/Add new enforcement officer/)
  fireEvent.click(addButton)
  await screen.findByText('Submit')

  const nameInput = await screen.findByLabelText(/New Officer Name/)
  const idInput = await screen.findByLabelText(/New Officer ID/)
  const emailInput = await screen.findByLabelText(/New Officer Email/)
  const passwordInput = await screen.findByLabelText(/Set Password/)
  const confirmInput = await screen.findByLabelText(/Confirm Password/)
  await userEvent.type(nameInput, newEnforcer.name)
  await userEvent.type(idInput, newEnforcer.enforcementId)
  await userEvent.type(emailInput, newEnforcer.email)
  await userEvent.type(passwordInput, newEnforcer.password)
  await userEvent.type(confirmInput, newEnforcer.password)

  fireEvent.click(screen.getByText('Submit'))
  await waitFor(() => {
    expect(alertCalled).toBe(true)
  })
}, 10000)
