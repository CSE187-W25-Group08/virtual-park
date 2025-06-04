import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup, fireEvent  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'

import { vehicle as vehicleMessages } from '../../messages/en.json'
import RegisterVehiclesPage from '../../src/app/[locale]/register/page'

// mock next.js stuff navigation and cookies
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
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ vehicle: vehicleMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('should call registerVehicle() on save', async () => {
  renderWithIntl(<RegisterVehiclesPage />)

  const registerVehicle = await screen.findByText('+ Register Vehicle')
  await userEvent.click(registerVehicle)

  const licensePlate = await screen.findByLabelText(/License Plate/i)
  await userEvent.type(licensePlate, 'TEST123')
  const make = await screen.findByLabelText(/Make/i)
  await userEvent.type(make, 'Toyota')
  const model = await screen.findByLabelText(/Model/i)
  await userEvent.type(model, 'Corolla')
  const color = await screen.findByLabelText(/Color/i)
  await userEvent.type(color, 'Silver')

  const vehicleTypeDropdown = screen.getByRole('combobox', { name: '' })
  fireEvent.mouseDown(vehicleTypeDropdown)
  const option = await screen.findByText('Car') // or whatever one of the valid options is
  fireEvent.click(option)

  const save = await screen.findByText('Save')
  await userEvent.click(save)
})
