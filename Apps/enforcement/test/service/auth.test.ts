import { it, vi, expect, beforeEach, afterEach, describe } from 'vitest'
import { getDriver } from '../../src/auth/service'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({ 
    get: vi.fn().mockReturnValue({ value: 'testing-cookie' }) 
  }))
}))


  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })


it('should return null when getDriver throws an error', async () => {
  const authService = await import('../../src/auth/service')
  vi.spyOn(authService, 'getDriver').mockRejectedValue(new Error('Database connection failed'))

  const { getDriverDetails } = await import('../../src/app/ticket/action')
  
  const result = await getDriverDetails('driver123')
  expect(result).toBeNull()
})

it('should handle error when cookies throws an error', async () => {
  const { cookies } = await import('next/headers')
  
  vi.mocked(cookies).mockImplementation(() => {
    throw new Error('Cookies not available')
  })
  const { getDriverDetails } = await import('../../src/app/ticket/action')
  const result = await getDriverDetails('driver123')
  expect(result).toBeNull()
})



it('should resolve with data when response status is 200', async () => {
  const mockDriverData = {id: 'driver111', name: 'Jack', email: 'jack@books.com'}
  
  vi.mocked(fetch).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(mockDriverData)
  } as Response)

  const result = await getDriver('driver111', 'valid-token')
  expect(result).toEqual(mockDriverData)
})

it('should reject with statusText when response status is 401 Unauthorized', async () => {
  vi.mocked(fetch).mockResolvedValue({
    status: 401,
    statusText: 'Unauthorized'
  } as Response)

  await expect(getDriver('driver111', 'invalid-token'))
    .rejects.toBe('Unauthorized')
})
