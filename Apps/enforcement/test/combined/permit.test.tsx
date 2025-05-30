import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import userEvent from '@testing-library/user-event'
// import { NextIntlClientProvider } from 'next-intl'

// import PurchaseHistoryPage from '../../src/app/[locale]/permit/history/page'
// import { permit_history as permitHistoryMessages } from '../../messages/en.json'
import PermitPage from '../../src/app/permit/page'
import Page from '../../src/app/page'
import { getPermitByPlate, recognizePlateFromImage } from '../../src/permit/service'

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

it("render page", async () => {
  render(<Page />)
  const heading = screen.getByText('Vehicle Permit')
  expect(heading).toBeTruthy()
})

it("should show a valid permit message when there is a valid permit belong to the specific vehicle", async () => {
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
  await screen.findByText('Valid permit found for vehicle 123ABC')
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

it('test recognizePlateFromImage no license', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(recognizePlateFromImage('invalidCookie', 'abc12'))
    .rejects
    .toBe('Unauthorized')
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
    if (url === 'http://localhost:4020/graphql') {
    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        data: {
          getVehicleByPlate: {
            id: 'vehicle101',
            licensePlate: '123owo',
            driver: 'driver0827',
            make: 'Toyota',
            model: 'Corolla',
            color: 'white'
          }
        }
      })
    } as Response)
  }

    return Promise.reject(new Error('Unknown fetch'))
  })

  render(<PermitPage />)
  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123owo')
  await userEvent.click(screen.getByText('Search'))
  await screen.findByText('No permits found for this vehicle')
})


it("should show red row color when the permit is invalid", async () => {
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
                  isValid: false
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
})