import { it, afterEach, vi, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import Page from '../../src/app/[locale]/dashboard/page'
import { dashboard as dashboardMessages } from '../../messages/en.json'
import { permit_history as permitHistoryMessages } from '../../messages/en.json'
import { ticket as ticketMessages } from '../../messages/en.json'
import { getUserVehicles } from '../../src/app/[locale]/register/actions'

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

vi.mock('../../src/app/[locale]/register/actions', () => ({
  getUserVehicles: vi.fn(),
}))

vi.mocked(getUserVehicles).mockResolvedValue([
  {
    id: '1',
    licensePlate: 'ABC1234',
    driver: 'Molly Member',
    make: 'Honda',
    model: 'Pilot',
    color: 'Black',
  }
])

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ permit_history: permitHistoryMessages, dashboard: dashboardMessages, ticket: ticketMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('should fetch user\'s active vehicle', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/graphql')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            getUserVehicles: [
              {
                id: '1',
                licensePlate: 'ABC1234',
                driver: 'Molly Member',
                make: 'Honda',
                model: 'Pilot',
                color: 'Black',
              }
            ],
          },
        }),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  renderWithIntl(<Page />)

  await screen.findByText('Honda Pilot - Black (ABC1234)')
})

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

  await screen.findByText('Pay Tickets')
})