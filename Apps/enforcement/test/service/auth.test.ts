import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import '@testing-library/jest-dom/vitest'
import {cleanup } from '@testing-library/react'
import { getDriver} from '../../src/auth/service'

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
})

it('should reject with statusText when response status is not 200', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 404,
    statusText: 'Not Found',
  }))

  await expect(getDriver('driver111', 'valid-cookie'))
    .rejects.toBe('Not Found')
})