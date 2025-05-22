import { it, afterEach, vi, expect, beforeAll, beforeEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import BottomNavbar from '../../src/components/BottomNavbar'
import { bottom_navbar as navbarMessages } from '../../messages/en.json'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

beforeAll(() => {
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }

  window.matchMedia = (query) => ({
    matches: query.includes(`${window.innerWidth}`) || window.innerWidth <= 600,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
})

beforeEach(() => {
  window.resizeTo(375, 667)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ bottom_navbar: navbarMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('redirects to /dashboard', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<BottomNavbar />)
  const home = screen.getByLabelText('Home Button');
  fireEvent.click(home)
  expect(mockPush).toHaveBeenCalledWith('/dashboard')
})

it('redirects to /register', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<BottomNavbar />)
  const vehicles = screen.getByLabelText('Vehicles Button');
  fireEvent.click(vehicles)
  expect(mockPush).toHaveBeenCalledWith('/register')
})

it('redirects to permit/purchase', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<BottomNavbar />)
  const purchase = screen.getByLabelText('Purchase Button');
  fireEvent.click(purchase)
  expect(mockPush).toHaveBeenCalledWith('/permit/purchase')
})

it('redirects to /ticket', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<BottomNavbar />)
  const renew = screen.getByLabelText('Ticket Button');
  fireEvent.click(renew)
  expect(mockPush).toHaveBeenCalledWith('/ticket')
})