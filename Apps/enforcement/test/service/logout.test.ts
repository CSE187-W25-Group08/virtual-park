import { it, expect, vi, beforeEach } from 'vitest'
import { logout } from '../../src/app/login/action'

const cookieDeleteMock = vi.fn()
const mockCookieStore = {
  delete: cookieDeleteMock,
}

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore))
}))


beforeEach(() => {
  vi.clearAllMocks()
})

it('should delete session cookie when logout is called', async () => {
  await logout()
  expect(cookieDeleteMock).toHaveBeenCalledWith('session')
})
