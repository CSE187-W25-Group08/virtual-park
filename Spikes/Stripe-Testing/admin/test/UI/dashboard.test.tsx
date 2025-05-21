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

vi.mock('../../src/app/dashboard/actions', () => ({
  listAppeals: vi.fn(() => testTicket),
}))

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

it('Navigates to drivers', async () => {
  render(<SideBarNav />)
  const driverNavigation = await screen.findByText('Drivers')
  await fireEvent.click(driverNavigation)
  expect(mockPush).toHaveBeenCalledWith('/drivers')
})

it('Navigates to home', async () => {
  render(<SideBarNav />)
  const driverNavigation = await screen.findByText('Home')
  await fireEvent.click(driverNavigation)
  expect(mockPush).toHaveBeenCalledWith('/')
})
