import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { recognizePlateFromImage } from '../../src/permit/service'

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => Promise.resolve({
    get: vi.fn().mockReturnValue({value: 'testing-cookie'})
  }))
}))

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
})

it('unauthorized case for recognizePlateFromImage', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(recognizePlateFromImage('invalidCookie', '999ab'))
    .rejects.toBe('Unauthorized')
})

it('catch error case for recognizePlateFromImage', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Connection error')))

  await expect(recognizePlateFromImage('validCookie', '12cd'))
    .rejects.toBe('Failed to contact OCR service')
})

it('successful case for recognizePlateFromImage', async () => {
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

it('googleVision works', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 200,
    json: () => Promise.resolve({
      data: {
        scanImage: {
          licensePlate: 'jz190'
        }
      }
    })
  } as Response))

  const { googleVision } = await import('../../src/app/permit/action')
  
  const result = await googleVision('data:image/jpeg;base64,carImage')
  
  expect(result).toBe('jz190')
})

it('unauthorized error case for googleVision', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  const { googleVision } = await import('../../src/app/permit/action')
  
  await expect(googleVision('data:image/jpeg;base64,carimage'))
    .rejects.toBe('Unauthorized')
})

