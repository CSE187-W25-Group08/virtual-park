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

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  }),
}))

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
    <NextIntlClientProvider locale="en" messages={{ purchase_permit: purchasePermitMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('renders permit types returned from permitTypes()', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/graphql')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            PermitType: [
              {
                type: 'Student',
                price: 3.14
              }
            ]
          },
        }),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })
  renderWithIntl(<TypePage />)
  await screen.findByText('Student')
  const purchaseButton = await screen.findByLabelText('Purchase Student Permit')
  await userEvent.click(purchaseButton)
  expect(alert).toHaveBeenCalledWith('Purchased: Student ($3.14)')
})

/* reference: https://web.dev/learn/testing/get-started/component-testing */
it('getPermitType rejects and return authorized error', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(getPermitType('invalidCookie')).rejects.toBe('Unauthorized')
})
