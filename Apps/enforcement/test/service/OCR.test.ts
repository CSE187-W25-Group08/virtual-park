import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import '@testing-library/jest-dom/vitest'
import {cleanup } from '@testing-library/react'
import { recognizePlateFromImage } from '../../src/permit/service'

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

it('test recognizePlateFromImage with unauthorized case', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(recognizePlateFromImage('invalidCookie', 'abc12'))
    .rejects.toBe('Unauthorized')
})

it('test recognizePlateFromImage catch error case', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Connection error')))

  await expect(recognizePlateFromImage('validCookie', 'abc12'))
    .rejects.toBe('Failed to contact OCR service')
})

it('test recognizePlateFromImage successful case', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 200,
    json: () => Promise.resolve({
      data: {
        scanImage: {
          licensePlate: '123BC4A'
        }
      }
    })
  } as Response))

  const result = await recognizePlateFromImage('validCookie', 'base64ImageString')
  expect(result).toBe('123BC4A')
})