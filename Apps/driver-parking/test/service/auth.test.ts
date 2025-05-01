import { vi, it, expect, afterEach } from 'vitest'
import { signupUser } from '../../src/auth/service'

vi.mock('server-only', () => ({}))

afterEach(() => {
  vi.restoreAllMocks()
})

it('successfully signs up a user', async () => {
  const mockUser = {email: 'test@email.com', password: 'password', name: 'Test User'}
  const mockResponse = {name: 'Test User', accessToken: 'token'}

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 201,
    json: async () => mockResponse,
  } as Response)

  const result = await signupUser(mockUser)
  expect(result).toEqual(mockResponse)
})

it('unsuccessfully signs up a user', async () => {
  const mockUser = {email: 'test@email.com', password: 'password', name: 'Test User'}

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 409,
    statusText: 'Conflict',
  } as Response)

  await expect(signupUser(mockUser)).rejects.toEqual('Conflict')
})