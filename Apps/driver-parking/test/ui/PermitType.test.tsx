import { it, afterEach, vi, expect } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import Typelist from '../../src/app/[locale]/permit/purchase/Typelist'
import { permitTypes, getUserPermits } from '../../src/app/[locale]/permit/actions'
import { purchase_permit as purchasePermitMessages } from '../../messages/en.json'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const mockedGetCookies = vi.fn()
vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: mockedGetCookies,
    delete: vi.fn(),
  }),
}))

vi.mock('../../src/app/[locale]/permit/actions', () => ({
  permitTypes: vi.fn(),
  getUserPermits: vi.fn()
}))

const mockPermitTypes = vi.mocked(permitTypes)
const mockUserPermits = vi.mocked(getUserPermits)

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ purchase_permit: purchasePermitMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

const mockPush = vi.fn();
vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

it('mocks Typelist component', async () => {
  mockedGetCookies.mockReturnValue({ value: 'mock-session-token' })
  const types = [{
    id: '1',
    type: 'Daily',
    price: 5,
    permitClass: 'Remote'
  },
  {
    id: '2',
    type: 'Week',
    price: 27,
    permitClass: 'Remote'
  },
  {
    id: '3',
    type: 'Month',
    price: 90,
    permitClass: 'Remote'
  }]
  mockPermitTypes.mockResolvedValueOnce(types)
  mockUserPermits.mockResolvedValueOnce([])
  renderWithIntl(<Typelist />)

  await screen.findByText('Remote')
})