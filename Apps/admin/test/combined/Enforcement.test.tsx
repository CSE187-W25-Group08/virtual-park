import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EnforcementList from '@/app/enforcement/EnforcementList'
import { newEnforcer, testEnforcers } from '../MockData'

const mockedPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockedPush,
  })
}))

const mockedGetCookies = vi.fn()
vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: mockedGetCookies,
    delete: vi.fn(),
  }),
}))

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it('Fetch the correct list of enforcers', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/enforcement')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(testEnforcers),
      } as Response)
    }

    return Promise.reject('Unknown fetch')
  })

  render(<EnforcementList />)
  await screen.findByText('Edna Enforcer')
  await screen.findByText('Peter Patrol')
})

it('Creates a new enforcement account successfully', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })
  const { password, ...rest } = newEnforcer

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/enforcement')) {
      if (options?.method == 'POST') {
        return Promise.resolve({
          status: 201,
          json: () => Promise.resolve(rest),
        } as Response)
      }

      if (options?.method == 'GET') {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(testEnforcers)
        } as Response)
      }
    }

    return Promise.reject('Unknown fetch')
  })

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

  await screen.findByText(newEnforcer.name)
}, 4000)

it('Actions handles an undefined response', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/enforcement')) {
      if (options?.method == 'POST') {
        return Promise.resolve({
          status: 409,
          json: () => Promise.resolve(undefined),
        } as Response)
      }

      if (options?.method == 'GET') {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(testEnforcers)
        } as Response)
      }
    }

    return Promise.reject('Unknown fetch')
  })

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
})

it('Blocks an unauthorized fetch call for getting enforcement', async () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/enforcement')) {
      return Promise.resolve({
        status: 401,
      } as Response)
    }

    return Promise.reject('Unknown fetch')
  })

  render(<EnforcementList />)
  expect(screen.queryByText('Edna Enforcer')).toBeNull()
})

it('Blocks an unauthorized fetch call for creating a new officer', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/enforcement')) {
      if (options?.method == 'POST') {
        return Promise.resolve({
          status: 401,
        } as Response)
      }

      if (options?.method == 'GET') {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(testEnforcers)
        } as Response)
      }
    }

    return Promise.reject('Unknown fetch')
  })

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
})
