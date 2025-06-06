import { it, afterEach, vi, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { testLots } from '../testData'
import Landing from '../../src/app/landing/Landing'
import { landing as landingMessages } from '../../messages/en.json'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/[locale]/login/action', () => ({
  logout: vi.fn()
}))

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ landing: landingMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

const mockLotsFetch = () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
  const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
  const query = body.query || ''
  if (query.includes('getAll')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        data: { getAll: testLots }
      }),
    } as Response)
  }
  return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any
}
it('mocks clicking Park Now', () => {
  mockLotsFetch()
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Landing />)
  const loginButton = screen.getByText('Park Now')
  fireEvent.click(loginButton)
  expect(mockPush).toHaveBeenCalledWith('/permit/purchase')
})

it('mocks clicking Log in  button', async () => {
  mockLotsFetch()
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Landing />)
  const menuButton = screen.getByLabelText("menu options")
  fireEvent.click(menuButton)
  const signupButton = await screen.findByText('Log In')
  fireEvent.click(signupButton)
  expect(mockPush).toHaveBeenCalledWith('/login')
})

it('mocks clicking signup button', async () => {
  mockLotsFetch()
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Landing />)
  const menuButton = screen.getByLabelText("menu options")
  fireEvent.click(menuButton)
  const signupButton = await screen.findByText('Sign Up')
  fireEvent.click(signupButton)
  expect(mockPush).toHaveBeenCalledWith('/signup')
})

it('clicking logo redirects to /', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Landing />)
  const logo = await screen.getByAltText('Virtual Park Logo')
  fireEvent.click(logo)
  expect(mockPush).toHaveBeenCalledWith('/')
})
