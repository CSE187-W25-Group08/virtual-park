import { it, afterEach, vi, expect } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import Typelist from '../../src/app/[locale]/permit/purchase/Typelist'
import { permitTypes } from '../../src/app/[locale]/permit/actions'
import { purchase_permit as purchasePermitMessages } from '../../messages/en.json'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

vi.mock('../../src/app/[locale]/permit/actions', () => ({
  permitTypes: vi.fn()
}))

const mockPermitTypes = vi.mocked(permitTypes)

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ purchase_permit: purchasePermitMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('mocks Typelist component', async () => {
  const types = [{
    type: 'Student',
    price: 3.14
  },
  {
    type: 'Staff',
    price: 6.14
  },
  {
    type: 'Disabled',
    price: 10.14
  }]
  mockPermitTypes.mockResolvedValueOnce(types)

  renderWithIntl(<Typelist />)

  await screen.findByText('Student')
})