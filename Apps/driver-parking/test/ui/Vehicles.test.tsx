import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import Vehicles from '../../src/app/[locale]/register/Vehicles'
import RegisterVehiclesPage  from '../../src/app/[locale]/register/page'
import * as actions from '../../src/app/[locale]/register/actions'
import { vehicle as vehicleMessages } from '../../messages/en.json'

vi.spyOn(actions, 'registerVehicle').mockResolvedValue({
  id: '1',
  licensePlate: 'TEST123',
  make: 'Toyota',
  model: 'Corolla',
  color: 'Silver',
  driver: 'some-driver-id',
  active: true,
})

afterEach(() => {
  cleanup()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ vehicle: vehicleMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('Register Button Exists', async () => {
    renderWithIntl(<RegisterVehiclesPage/>)
    const registerButton = await screen.findByText('+ Register Vehicle');
    expect(registerButton).not.toBeNull();
})

it('Click on Register Vehicle then Click Cancel', async () => {
  renderWithIntl(<Vehicles/>)
  const registerButton = await screen.findByText('+ Register Vehicle');
  fireEvent.click(registerButton);

  const cancelButton = await screen.findByText('Cancel');
  fireEvent.click(cancelButton);
})

it('Click on Register Vehicle and access registration form', async () => {
  renderWithIntl(<Vehicles/>)
  const registerButton = await screen.findByText('+ Register Vehicle');
  fireEvent.click(registerButton);

  // Fill inputs
  fireEvent.change(await screen.findByLabelText(/License Plate/i), {
    target: { value: 'TEST123' },
  })
  fireEvent.change(await screen.findByLabelText(/Make/i), {
    target: { value: 'Toyota' },
  })
  fireEvent.change(await screen.findByLabelText(/Model/i), {
    target: { value: 'Corolla' },
  })
  fireEvent.change(await screen.findByLabelText(/Color/i), {
    target: { value: 'Silver' },
  })

  const dropdownTrigger = screen.getByRole('combobox')
fireEvent.mouseDown(dropdownTrigger)

const option = await screen.findByText('Car')
fireEvent.click(option)

  
  const saveButton = await screen.findByText(/Save/i)
  expect(saveButton.hasAttribute('disabled')).toBe(false)
})

it('Edit button is rendered', async () => {
  vi.spyOn(actions, 'getUserVehicles').mockResolvedValue([{  id: '1',
  licensePlate: 'TEST123',
  make: 'Toyota',
  model: 'Corolla',
  color: 'Silver',
  driver: 'some-driver-id',
  active: true,
type: 'Car' }])
  renderWithIntl(<Vehicles/>)

  
  await screen.findByText(/Edit/i)
})
it('Edit button is clicked', async () => {
  vi.spyOn(actions, 'getUserVehicles').mockResolvedValue([{  id: '1',
  licensePlate: 'TEST123',
  make: 'Toyota',
  model: 'Corolla',
  color: 'Silver',
  driver: 'some-driver-id',
  active: true,
type: 'Car' }])
  renderWithIntl(<Vehicles/>)

  
  const editButton = await screen.findByText(/Edit/i)
  fireEvent.click(editButton)
  await screen.findByText(/Make\s*\*/i)
})