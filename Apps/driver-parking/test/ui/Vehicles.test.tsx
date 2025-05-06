import { it, afterEach, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

import Vehicles from '../../src/app/[locale]/register/Vehicles'
import RegisterVehiclesPage  from '../../src/app/[locale]/register/page'
import * as actions from '../../src/app/[locale]/register/actions'

vi.spyOn(actions, 'registerVehicle').mockResolvedValue({
  id: '1',
  licensePlate: 'TEST123',
  make: 'Toyota',
  model: 'Corolla',
  color: 'Silver',
  driver: 'some-driver-id'
})

afterEach(() => {
  cleanup()
})

it('Register Button Exists', async () => {
    render(<RegisterVehiclesPage/>)
    const registerButton = screen.getByText('+ Register Vehicle');
    expect(registerButton).not.toBeNull();
})

it('Click on Register Vehicle then Click Cancel', async () => {
  render(<Vehicles/>)
  const registerButton = screen.getByText('+ Register Vehicle');
  fireEvent.click(registerButton);

  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);
})

it('Click on Register Vehicle and access registration form', async () => {
  render(<Vehicles/>)
  const registerButton = screen.getByText('+ Register Vehicle');
  fireEvent.click(registerButton);

  // Fill inputs
  fireEvent.change(screen.getByLabelText(/License Plate/i), {
    target: { value: 'TEST123' },
  })
  fireEvent.change(screen.getByLabelText(/Make/i), {
    target: { value: 'Toyota' },
  })
  fireEvent.change(screen.getByLabelText(/Model/i), {
    target: { value: 'Corolla' },
  })
  fireEvent.change(screen.getByLabelText(/Color/i), {
    target: { value: 'Silver' },
  })
  fireEvent.click(screen.getByText(/Default Vehicle/i))

  const saveButton = screen.getByText(/Save/i)
  expect(saveButton.hasAttribute('disabled')).toBe(false)
  fireEvent.click(saveButton)

  await screen.findByText(/Toyota, Corolla - Silver/i)

  // expect(screen.queryByText(/Register Vehicle/i)).toBeNull()
})