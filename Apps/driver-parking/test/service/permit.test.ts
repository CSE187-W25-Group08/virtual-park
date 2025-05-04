import { vi, it, expect, afterEach } from 'vitest'
import { getPermitByDriver } from '../../src/permit/service'

vi.mock('server-only', () => ({}))

afterEach(() => {
  vi.restoreAllMocks()
})

it('successfully gets all permits from a driver', async () => {
  const mockToken = 'token'
  const mockResponse = {
    data: {
      permitsByDriver: [
        {
          type: 'Student',
          issueDate: '2025-01-01',
          expDate: '2025-01-01',
          price: 3.14,
        },
      ]
    }
  }
  const mockResponseFormatted =
    {
      type: 'Student',
      issueDate: '2025-01-01',
      expDate: '2025-01-01',
      price: 3.14,
    }

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 200,
    json: async () => mockResponse,
  } as Response)

  const result = await getPermitByDriver(mockToken)
  expect(result).toEqual([mockResponseFormatted])
})

it('unsuccessfully gets all permits from a driver', async () => {
  const mockToken = 'token'

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 401,
    statusText: 'Unauthorized',
  } as Response)

  await expect(getPermitByDriver(mockToken)).rejects.toEqual('Unauthorized')
})