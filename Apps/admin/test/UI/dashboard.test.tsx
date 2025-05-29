import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent} from '@testing-library/react'
import { testTicket } from '../MockData'
import SideBarNav from '@/app/dashboard/SideBarNav'
import { resolve } from 'path'

const mockPush = vi.fn()
const mockPathname = "/drivers/123";

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'mock-session-token' })),
    delete: vi.fn(),
  }),
}))

vi.mock('../../src/app/dashboard/actions', () => ({
  listAppeals: vi.fn(() => testTicket),
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it('Navigates to drivers', async () => {
  render(<SideBarNav />)
  const driverNavigation = await screen.findByText('Enforcement')
  await fireEvent.click(driverNavigation)
  expect(mockPush).toHaveBeenCalledWith('/enforcement')
})

it('Navigates to home', async () => {
  render(<SideBarNav />)
  const driverNavigation = await screen.findByText('Home')
  await fireEvent.click(driverNavigation)
  expect(mockPush).toHaveBeenCalledWith('/')
})

import * as logoutModule from '@/app/login/action'

vi.spyOn(logoutModule, 'logout').mockResolvedValue(undefined)

it('Navigates upon logout', async () => {
  render(<SideBarNav />)
  const logoutButton = await screen.findByLabelText('logout')
  await fireEvent.click(logoutButton)
  expect(mockPush).toHaveBeenCalledOnce()
})