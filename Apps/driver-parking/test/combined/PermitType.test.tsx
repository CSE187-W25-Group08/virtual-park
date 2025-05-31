import { it, vi, beforeEach, afterEach, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import TypePage from '../../src/app/[locale]/permit/purchase/page'
import { useRouter } from 'next/navigation'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'

import { purchase_permit as purchasePermitMessages } from '../../messages/en.json'
import { getPermitType } from '../../src/permit/service'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))


const mockedGetCookies = vi.fn()
vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: mockedGetCookies,
    delete: vi.fn(),
  }),
}))

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ purchase_permit: purchasePermitMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('renders permit types returned from permitTypes()', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url, options) => {
    const body = JSON.parse(options?.body as string)
    // Match PermitType query

    if (body.query.includes('PermitType')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          data: {
            PermitType: [
              { id: '1', type: 'Daily', price: 5, permitClass: 'Remote' },
              { id: '2', type: 'Month', price: 20, permitClass: 'Remote' },
            ],
          },
        }),
      } as Response)
    }
    // Match permitsByDriver query
    if (body.query.includes('permitsByDriver')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          data: {
            permitsByDriver: [
              { id: '101', type: 'Daily', price: 5, issueDate: '2024-01-01', expDate: '2099-01-01', permitClass: 'Remote' },
            ],
          },
        }),
      } as Response)
    }

    if (body.query.includes('primaryVehicle')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        data: {
          primaryVehicle: null, // or a mock object if needed
        },
      }),
    } as Response)
  }

    return Promise.reject(new Error('Unknown GraphQL query'))
  }) as typeof fetch

  renderWithIntl(<TypePage />)
  await screen.findByText('Remote')
})

/* reference: https://web.dev/learn/testing/get-started/component-testing */
it('getPermitType rejects and return authorized error', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(getPermitType('invalidCookie')).rejects.toBe('Unauthorized')
})
