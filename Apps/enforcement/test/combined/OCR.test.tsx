import { it, afterEach, vi, beforeEach, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react'
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
  /* reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL*/
  const mockFileReader = {
    readAsDataURL: vi.fn(),
    onload: null as any,
    result: 'data:image/jpeg;base64,dGVzdCBjb250ZW50'
  }
  vi.stubGlobal('FileReader', vi.fn(() => mockFileReader))

  render(<PermitPage />)
  
  const file = new File(['carplate number'], 'carplate.jpg', { type: 'image/jpeg' })
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

it('should handle OCR failure and show error message', async () => {
  const permitActions = await import('../../src/app/permit/action')

  const mockGoogleVision = vi.fn().mockResolvedValue(null)
  
  const mockGetallLots = vi.fn().mockResolvedValue([
    { id: 'lot-123', name: 'Lot 101', validPermits: ['Student'] }
  ])
  
  permitActions.googleVision = mockGoogleVision
  permitActions.getallLots = mockGetallLots

  const mockFileReader = {
    readAsDataURL: vi.fn(),
    onload: null as any,
    result: 'data:image/jpeg;base64,dGVzdCBjb250ZW50'
  }
  vi.stubGlobal('FileReader', vi.fn(() => mockFileReader))

  render(<PermitPage />)
  /* reference: https://medium.com/@pawankp550/react-testing-library-how-to-test-a-file-input-8bc1edc88ad */
  const file = new File(['carplate number'], 'carplate.jpg', { type: 'image/jpeg' })
  const fileInput = screen.getByLabelText(/upload/i)
  
  await userEvent.upload(fileInput, file)
  
  if (mockFileReader.onload) {
    mockFileReader.onload({} as any)
  }
  
  await waitFor(() => {
    screen.getByText('Failed to recognize license plate')
  })

  const plateInput = screen.getByPlaceholderText('Enter car plate number')
  expect(plateInput).toHaveValue('')
})

it('should handle no file selected and return early', async () => {
  const permitActions = await import('../../src/app/permit/action')

  const mockGoogleVision = vi.fn()
  const mockGetallLots = vi.fn().mockResolvedValue([
    { id: 'lot-123', name: 'Lot 101', validPermits: ['Student'] }
  ])
  
  permitActions.googleVision = mockGoogleVision
  permitActions.getallLots = mockGetallLots

  render(<PermitPage />)
  
  const fileInput = screen.getByLabelText(/upload/i)
  /* reference: https://testing-library.com/docs/dom-testing-library/api-events/ */
  fireEvent.change(fileInput, {
    target: { files: null }
  })
  
  await waitFor(() => {
    expect(mockGoogleVision).not.toHaveBeenCalled()
  })
})