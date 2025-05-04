// import { vi, it, expect, afterEach } from 'vitest'
// import { getPermitByDriver } from '../../src/permit/service'

// vi.mock('server-only', () => ({}))

// afterEach(() => {
//   vi.restoreAllMocks()
// })

// it('successfully gets all permits from a driver', async () => {
//   const mockUser = {email: 'test@email.com', password: 'password', name: 'Test User'}
//   const mockResponse = {name: 'Test User', accessToken: 'token'}

//   vi.spyOn(global, 'fetch').mockResolvedValueOnce({
//     status: 201,
//     json: async () => mockResponse,
//   } as Response)

//   const result = await signupUser(mockUser)
//   expect(result).toEqual(mockResponse)
// })