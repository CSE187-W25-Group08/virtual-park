import { vi, it, expect, afterEach } from 'vitest'
import { signupUser, authenticate, check } from '../../src/auth/service'

vi.mock('server-only', () => ({}))

afterEach(() => {
  vi.restoreAllMocks()
})

it('successfully signs up a user', async () => {
  const mockUser = { email: 'test@email.com', password: 'password', name: 'Test User' }
  const mockResponse = { name: 'Test User', accessToken: 'token' }

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 201,
    json: async () => mockResponse,
  } as Response)

  const result = await signupUser(mockUser)
  expect(result).toEqual(mockResponse)
})

it('unsuccessfully signs up a user', async () => {
  const mockUser = { email: 'test@email.com', password: 'password', name: 'Test User' }

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 409,
    statusText: 'Conflict',
  } as Response)

  await expect(signupUser(mockUser)).rejects.toThrow('Conflict');
})

it('successfully authenticates a user', async () => {
  const mockUser = { email: 'test@email.com', password: 'password' }
  const mockResponse = { name: 'Test User', accessToken: 'token' }

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 200,
    json: async () => mockResponse,
  } as Response)

  const result = await authenticate(mockUser)
  expect(result).toEqual(mockResponse)
})

it('unsuccessfully authenticates a user', async () => {
  const mockUser = { email: 'test@email.com', password: 'password' }

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 401,
    statusText: 'Unauthorized',
  } as Response)

  await expect(authenticate(mockUser)).rejects.toThrow("Unauthorized")
})

it('successfully checks authentication', async () => {
  const mockToken = 'token'

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 200,
    json: async () => ({}),
  } as Response)

  await expect(check(mockToken)).resolves
})

it('unsuccessfully checks authentication', async () => {
  const mockToken = 'token'

  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 401,
    json: async () => ({}),
  } as Response)

  await expect(check(mockToken)).rejects.toEqual('Unauthorized')
})