import { it, afterEach, vi, beforeEach, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
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

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it('should handle OCR file upload and set plate number', async () => {
  const permitActions = await import('../../src/app/permit/action')

  const mockGoogleVision = vi.fn().mockResolvedValue('ABC123')
  const mockGetallLots = vi.fn().mockResolvedValue([
    { id: 'lot-123', name: 'Lot 101', validPermits: ['Student'] }
  ])
  const mockGetpermitByPlateNum = vi.fn().mockResolvedValue([
    { permitID: '123', permitClass: 'Student', isValid: true }
  ])
  
  permitActions.googleVision = mockGoogleVision
  permitActions.getallLots = mockGetallLots
  permitActions.getpermitByPlateNum = mockGetpermitByPlateNum

  const mockFileReader = {
    readAsDataURL: vi.fn(),
    onload: null as any,
    onerror: null as any,
    result: 'data:image/jpeg;base64,dGVzdCBjb250ZW50'
  }
  vi.stubGlobal('FileReader', vi.fn(() => mockFileReader))

  render(<PermitPage />)
  
  const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })
  const fileInput = screen.getByLabelText(/upload/i)
  
  await userEvent.upload(fileInput, file)
  
  if (mockFileReader.onload) {
    mockFileReader.onload({} as any)
  }
  const plateInput = screen.getByPlaceholderText('Enter car plate number')
    await waitFor(() => {
    expect(plateInput).toHaveValue('ABC123')
  })
})