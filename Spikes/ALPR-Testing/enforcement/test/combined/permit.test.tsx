import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import userEvent from '@testing-library/user-event'
// import { NextIntlClientProvider } from 'next-intl'

// import PurchaseHistoryPage from '../../src/app/[locale]/permit/history/page'
// import { permit_history as permitHistoryMessages } from '../../messages/en.json'
import PermitPage from '../../src/app/permit/page'
import { getPermitByPlate } from '../../src/permit/service'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(),
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

it("should fetch user's permits by plate", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (
      url === 'http://localhost:4000/graphql' 
    ) {
      return Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              getPermitBycarPlate: [
                {
                  permitID: '123',
                  permitType: 'Student',
                  issueDate: '2025-05-01',
                  expDate: '2025-06-01',
                  isValid: true
                }
              ]
            }
          }),
      } as Response)
    }

    return Promise.reject(new Error('Unknown fetch'))
  })

  render(<PermitPage />)

  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123ABC')
  await userEvent.click(screen.getByText('Search'))
  await screen.findByText('Student')
})

it("should show an error saying carplate should be enter", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (
      url === 'http://localhost:4000/graphql' 
    ) {
      return Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              getPermitBycarPlate: [
                {
                  permitID: '123',
                  permitType: 'Student',
                  issueDate: '2025-05-01',
                  expDate: '2025-06-01',
                  isValid: true
                }
              ]
            }
          }),
      } as Response)
    }

    return Promise.reject(new Error('Unknown fetch'))
  })

  render(<PermitPage />)

  await userEvent.click(screen.getByText('Search'))
  await screen.findByText('Please enter a car plate number')
})

/* reference: https://web.dev/learn/testing/get-started/component-testing */
it('getpermitBycarplate rejects and return authorized error', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(getPermitByPlate('invalidCookie', 'abc12')).rejects.toBe('Unauthorized')
})

it("should show an permit found for the vehicle error", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (
      url === 'http://localhost:4000/graphql' 
    ) {
      return Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            data: {
              getPermitBycarPlate: []
            }
          }),
      } as Response)
    }

    return Promise.reject(new Error('Unknown fetch'))
  })

  render(<PermitPage />)
  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123owo')
  await userEvent.click(screen.getByText('Search'))
  await screen.findByText('No permits found for this vehicle')
})
