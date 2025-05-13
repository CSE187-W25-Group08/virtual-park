import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent} from '@testing-library/react'
import { testAppeal } from '../MockData'
import SideBarNav from '@/app/dashboard/SideBarNav'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: vi.fn(),
}))

vi.mock('../../src/app/dashboard/actions', () => ({
  listAppeals: vi.fn(() => testAppeal),
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
