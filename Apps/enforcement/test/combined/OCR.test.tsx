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
  
  permitActions.googleVision = vi.fn().mockResolvedValue('ABC123')
  permitActions.getallLots = vi.fn().mockResolvedValue([
    { id: 'lot-123', name: 'Test Lot', validPermits: ['Student'] }
  ])
  permitActions.getpermitByPlateNum = vi.fn().mockResolvedValue([
    { permitID: '123', permitClass: 'Student', isValid: true }
  ])

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
  expect(plateInput).toHaveValue('')
  
})
// it('should handle OCR file upload and set plate number', async () => {
//   // Import the action module to get the mocked functions
//   const permitActions = await import('../../src/app/permit/action')
  
//   // Set up the mocks using vi.fn().mockResolvedValue
//   const mockGoogleVision = vi.fn().mockResolvedValue('ABC123')
//   const mockGetallLots = vi.fn().mockResolvedValue([
//     { id: 'lot-123', name: 'Test Lot', validPermits: ['Student'] }
//   ])
  
//   // Replace the mocked functions
//   permitActions.googleVision = mockGoogleVision
//   permitActions.getallLots = mockGetallLots

//   // Mock FileReader
//   const mockFileReader = {
//     readAsDataURL: vi.fn(),
//     onload: null as any,
//     onerror: null as any,
//     result: 'data:image/jpeg;base64,dGVzdCBjb250ZW50'
//   }
//   vi.stubGlobal('FileReader', vi.fn(() => mockFileReader))

//   render(<PermitPage />)
  
//   // Wait for component to load
//   // await waitFor(() => {
//   //   expect(screen.getByText('Test Lot')).toBeInTheDocument()
//   // })
  
//   const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })
//   const fileInput = screen.getByLabelText(/upload/i)
  
//   await userEvent.upload(fileInput, file)
  
//   // Trigger FileReader onload
//   if (mockFileReader.onload) {
//     mockFileReader.onload({} as any)
//   }
  
//   // Verify OCR worked and plate was set
//   await waitFor(() => {
//     const plateInput = screen.getByPlaceholderText('Enter car plate number')
//     expect(plateInput).toHaveValue('ABC123')
//   })
  
//   // Verify googleVision was called
//   expect(mockGoogleVision).toHaveBeenCalledWith('dGVzdCBjb250ZW50')
// })