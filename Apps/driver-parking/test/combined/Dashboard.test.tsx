import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import Page from '../../src/app/[locale]/dashboard/page'
import { dashboard as dashboardMessages } from '../../messages/en.json'
import { ticket as ticketMessages } from '../../messages/en.json'
import { listUnpaid } from '@/app/[locale]/ticket/actions'
import { getActivePermit, getDailyPermitType, getUserFuturePermit } from '@/app/[locale]/dashboard/actions'
import { getPrimaryVehicle } from '@/app/[locale]/register/actions'
import { createCheckout } from '@/stripe/helper'

import { testMotorcycle, testVehicle2 } from '../testData'
import { getFuturePermit } from '../../src/permit/service'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  }),
}))

vi.mock('../../src/app/[locale]/ticket/actions', () => ({
  listUnpaid: vi.fn(),
}))

vi.mock('../../src/app/[locale]/dashboard/actions', () => ({
  getActivePermit: vi.fn(),
  getDailyPermitType: vi.fn(),
  getUserFuturePermit: vi.fn(),
}))

vi.mock('../../src/app/[locale]/register/actions', () => ({
  getPrimaryVehicle: vi.fn(),
}))

vi.mock('../../src/stripe/helper', () => ({
  createCheckout: vi.fn(),
}))

vi.mocked(listUnpaid).mockResolvedValue([
  {
    id: "t3",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: false,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "dab",
    image: "/images/tickets/t2.jpg",
    cost: 50.02,
    appeal: "null",
    appealReason: "i did nothing wrong"
  }
])

vi.mocked(getDailyPermitType).mockResolvedValue(
  {
    id: 'p1',
    type: 'Daily',
    price: 6.00,
    permitClass: 'Remote'
  }
)

vi.mocked(getActivePermit).mockResolvedValue([])

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
  vi.stubGlobal('alert', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ dashboard: dashboardMessages, ticket: ticketMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}


it('should fetch user\'s unpaid tickets', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/graphql')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            getUnpaidTicket: [
              {
                id: "t3",
                vehicle: "XYZ5678",
                enforcer: "E456",
                lot: "Lot B",
                paid: false,
                description: "Does not matter",
                due: "2025-04-25T23:59:59Z",
                issue: "2025-04-25T09:00:00Z",
                violation: "dab",
                image: "/images/tickets/t2.jpg",
                cost: 50.02,
                appeal: "null"
              }
            ],
          },
        }),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  renderWithIntl(<Page />)

  await screen.findByText('dab')
})

it('Prompts for vehicle registration when user tries to buy a permit without one', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(getPrimaryVehicle).mockResolvedValue(undefined)

  renderWithIntl(<Page />)

  await screen.findByText('dab')
  fireEvent.click(screen.getByLabelText('Buy Daily Permit'))
  
  await screen.findByText(/You do not have a registered vehicle./)
})

it('Closes the registration prompt upon clicking No', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(getPrimaryVehicle).mockResolvedValue(undefined)

  renderWithIntl(<Page />)

  await screen.findByText('dab')
  fireEvent.click(screen.getByLabelText('Buy Daily Permit'))
  await screen.findByText(/You do not have a registered vehicle./)
  fireEvent.click(screen.getByText('No'))
  const promptText = screen.queryByText(/You do not have a registered vehicle./)
  expect(promptText).toBeNull()
})

it('Navigates to the registration page upon clicking Yes', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(getPrimaryVehicle).mockResolvedValue(undefined)

  renderWithIntl(<Page />)

  await screen.findByText('dab')
  fireEvent.click(screen.getByLabelText('Buy Daily Permit'))
  await screen.findByText(/You do not have a registered vehicle./)
  fireEvent.click(screen.getByText('Yes'))
  waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/register')
  })
})

it('Starts a stripe checkout session when Buy Permit is clicked', async () => {
  const mockPush = vi.fn()
  const mockCreateCheckout = vi.mocked(createCheckout)
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  mockCreateCheckout.mockResolvedValue(undefined)
  vi.mocked(getPrimaryVehicle).mockResolvedValue(testVehicle2) 

  renderWithIntl(<Page />)

  await screen.findByText('dab')
  fireEvent.click(screen.getByText(/Buy Daily: Remote/))
  waitFor(() => {
    expect(mockCreateCheckout).toHaveBeenCalled()
  })
})

it('Creates the checkout session with the correct permit values', async () => {
  const mockPush = vi.fn()
  const mockCreateCheckout = vi.mocked(createCheckout)
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  mockCreateCheckout.mockResolvedValue(undefined)
  vi.mocked(getPrimaryVehicle).mockResolvedValue(testMotorcycle)
  vi.mocked(getDailyPermitType).mockResolvedValue(
  {
    id: 'p2',
    type: 'Daily',
    price: 4.00,
    permitClass: 'Motorcycle'
  }
)

  renderWithIntl(<Page />)

  await screen.findByText('dab')
  fireEvent.click(screen.getByText(/Buy Daily: Motorcycle/))
  const expectedMetadata = {
    permitTypeId: 'p2',
    type: "permit",
    vehicleId: 'm1'
  }
  waitFor(() => {
    expect(mockCreateCheckout).toHaveBeenCalledWith("PermitPurchase", 4.00, expectedMetadata)
  })
})
