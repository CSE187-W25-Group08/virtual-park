import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import Navbar from '../../src/components/Navbar'
import {logout} from '../../src/app/[locale]/login/action'

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

it('Menu Button Exists', async () => {
    render(<Navbar locale='en'/>)
    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)
})

it('logs out user', async () => {
    render(<Navbar locale='en'/>)
    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    expect(mockLogout).toHaveBeenCalled()
})
