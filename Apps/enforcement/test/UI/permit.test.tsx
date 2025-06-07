
import { it,  vi, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import PermitPage from '../../src/app/permit/page'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn().mockReturnValue({value: 'session-cookie'}),
    delete: vi.fn(),
  }),
}))

vi.mock('../../src/app/permit/action', () => ({
  getallLots: vi.fn(),
  getpermitByPlateNum: vi.fn(),
  googleVision: vi.fn(),
  getDriverFromVehiclePlate: vi.fn(),
  getDriverDetails: vi.fn()
}))


vi.mock('../../src/permit/service', () => ({
  recognizePlateFromImage: vi.fn(),
  getPermitByPlate: vi.fn()
}))

it('should set driverID and vehicleID when no permits found but driver exists', async () => {
  const permitActions = await import('../../src/app/permit/action')
  permitActions.getpermitByPlateNum = vi.fn().mockResolvedValue([])
  permitActions.getDriverFromVehiclePlate = vi.fn().mockResolvedValue('driver111')
  permitActions.getVehicleId = vi.fn().mockResolvedValue('vehicle111')
  permitActions.getallLots = vi.fn().mockResolvedValue([
    { id: '101', name: 'Lot-101', validPermits: ['Student'] }
  ])

  render(<PermitPage />)

  const lotDropdown = screen.getByRole('combobox', { name: /lot/i })
  await userEvent.click(lotDropdown)
  
  await waitFor(() => {
    expect(screen.getByText('Lot-101')).toBeInTheDocument()
  })
  await userEvent.click(screen.getByText('Lot-101'))
  
  const plateInput = screen.getByPlaceholderText('Enter car plate number')
  await userEvent.type(plateInput, '1BC3')

  
  const searchButton = screen.getByText('Search')
  await userEvent.click(searchButton)
  
  await waitFor(() => {
    expect(screen.getByText('No permits found for this vehicle'))
  })
})