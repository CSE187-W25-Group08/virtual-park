import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import BottomNavbar from '../../src/components/BottomNavbar'
import { logout } from '../../src/app/[locale]/login/action'
import { navbar as navbarMessages } from '../../messages/en.json'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../src/app/[locale]/login/action', () => ({
  logout: vi.fn()
}))

const mockLogout = logout as ReturnType<typeof vi.fn>

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ navbar: navbarMessages }}>
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

it('logs out', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<BottomNavbar />)
  const logout = screen.getByLabelText('Logout Button');
  fireEvent.click(logout)
  expect(mockLogout).toHaveBeenCalled()
})