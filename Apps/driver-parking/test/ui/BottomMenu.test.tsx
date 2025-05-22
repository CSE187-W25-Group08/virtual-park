import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import BottomMenu from '../../src/components/BottomMenu'
import {logout} from '../../src/app/[locale]/login/action'
import { bottom_navbar as navbarMessages } from '../../messages/en.json'

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
    <NextIntlClientProvider locale="en" messages={{ bottom_navbar: navbarMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Menu Button Exists', async () => {
    renderWithIntl(<BottomMenu />)
    const menuButton = screen.getByLabelText('Bottom Menu')
    fireEvent.click(menuButton)
})

it('redirects to /permit/history', async () => {
    const mockPush = vi.fn()
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

    renderWithIntl(<BottomMenu />)
    const menuButton = screen.getByLabelText('Bottom Menu')
    fireEvent.click(menuButton)
    const historyButton = screen.getByText('Permit History')
    fireEvent.click(historyButton)
    expect(mockPush).toHaveBeenCalledWith('/permit/history')
})

it('logs out user', async () => {
    renderWithIntl(<BottomMenu />)
    const menuButton = screen.getByLabelText('Bottom Menu')
    fireEvent.click(menuButton)
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
})
