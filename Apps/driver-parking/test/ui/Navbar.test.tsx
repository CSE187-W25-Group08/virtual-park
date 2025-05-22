import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import Navbar from '../../src/components/Navbar'
import {logout} from '../../src/app/[locale]/login/action'
import { top_navbar as navbarMessages } from '../../messages/en.json'

const mockPush = vi.fn();
vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

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
    <NextIntlClientProvider locale="en" messages={{ top_navbar: navbarMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Menu Button Exists', async () => {
    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
})

it('redirects to /dashboard', async () => {
    const mockPush = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
    const historyButton = screen.getByText('Dashboard')
    fireEvent.click(historyButton)
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
})

it('redirects to /permit/history', async () => {
    const mockPush = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
    const historyButton = screen.getByText('Permit History')
    fireEvent.click(historyButton)
    expect(mockPush).toHaveBeenCalledWith('/permit/history')
})

it('redirects to /register', async () => {
    const mockPush = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
    const historyButton = screen.getByText('Vehicles')
    fireEvent.click(historyButton)
    expect(mockPush).toHaveBeenCalledWith('/register')
})

it('redirects to /permit/purchase', async () => {
    const mockPush = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
    const historyButton = screen.getByText('Purchase Permit')
    fireEvent.click(historyButton)
    expect(mockPush).toHaveBeenCalledWith('/permit/purchase')
})

it('redirects to /ticket', async () => {
    const mockPush = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
    const historyButton = screen.getByText('Tickets')
    fireEvent.click(historyButton)
    expect(mockPush).toHaveBeenCalledWith('/ticket')
})

it('logs out user', async () => {
    renderWithIntl(<Navbar />)
    const menuButton = screen.getByLabelText('menu')
    fireEvent.click(menuButton)
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
})

