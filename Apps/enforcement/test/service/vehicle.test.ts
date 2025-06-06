import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import '@testing-library/jest-dom/vitest'
import {cleanup } from '@testing-library/react'
import { UnregisterVehicle, getVehicle} from '../../src/vehicle/service'

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

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it('should reject with Unauthorized when response status is not 200 for UnregisterVehicle', async () => {

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: vi.fn()
  }))

  await expect(UnregisterVehicle('invalid-cookie', 'ABC123'))
    .rejects.toBe('Unauthorized')
  
})

it('should reject with Unauthorized when response status is not 200 for getVehicle', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: vi.fn()
  }))

  await expect(getVehicle('invalid-cookie', 'driver000','ABC123'))
    .rejects.toBe('Unauthorized')
})