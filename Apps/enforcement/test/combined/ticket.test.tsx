import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
// import { render, screen, cleanup, within } from '@testing-library/react'
import { screen, within, prettyDOM, render, cleanup} from '@testing-library/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import userEvent from '@testing-library/user-event'
// import { NextIntlClientProvider } from 'next-intl'

// import PurchaseHistoryPage from '../../src/app/[locale]/permit/history/page'
// import { permit_history as permitHistoryMessages } from '../../messages/en.json'
import PermitPage from '../../src/app/permit/page'
import {issueTicketForVehicle } from '../../src/ticket/service'
import {getAllLots } from '../../src/lot/service'



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

it('issueTicketForVehicle caused authorized reject when non 200 status code return', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 201,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(issueTicketForVehicle(
    'invalidCookie',
    'driverId',
    'vehicleId',
    'lotA',
    'Parking violation',
    'No permit',
    'parking.jpg',
    15.00,
    false
  )).rejects.toBe('Unauthorized')
})

it('getallLot caused authorized reject when non 200 status code return', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 201,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(getAllLots(
    'invalidCookie'
  )).rejects.toBe('Unauthorized')
})


it("issue ticket button test", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url === 'http://localhost:4000/graphql') {
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
    if (url === 'http://localhost:4040/graphql') {
      return Promise.resolve({ 
        status: 200,
        json: () => Promise.resolve({
          data: {
            getAll: [
              {
                id: 'l1',
                name: 'Area 51 Lot',
                zone: 'A',
                address: '123 Desert Rd',
                latitude: 0,
                longitude: 0,
                capacity: 100,
                availableSpots: 42,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Student'],
                ticketPrice: 75
              },
            ]
          }
        }),
      } as Response)
    }

    return Promise.reject(new Error('Unknown fetch'))
  })

  render(<PermitPage />)

  const lotSelect = screen.getByLabelText('Current Parking Lot')
  await userEvent.click(lotSelect)

  await userEvent.click(screen.getByText('Area 51 Lot'))
  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '1XXX000')
  await userEvent.click(screen.getByText('Search'))
  await userEvent.click(await screen.findByText('Issue Ticket'))
  await screen.findByText('Issue Parking Ticket')
})

it("issue ticket successfully", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url) => {
    if (url === 'http://localhost:4000/graphql') {
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
                  isValid: false,
                  driverID: 'driver111',
                  vehicleID: 'car123'
                }
              ]
            }
          }),
      } as Response)
    }
    if (url === 'http://localhost:4010/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            ticketIssue: {
              id: '1234',
              driverID: 'driver111',
              enforcer: '1111',
              lot: 'Area 51 Lot',
              paid: false,
              description: 'no valid permit',
              due: '2025-06-20',
              issue: '2025-05-24',
              violation: 'Expired Permit',
              image: 'car.jpg',
              cost: 50,
            }
          }
        }),
      } as Response)
    }
    if (url === 'http://localhost:4040/graphql') {
      return Promise.resolve({ 
        status: 200,
        json: () => Promise.resolve({
          data: {
            getAll: [
              {
                id: 'l1',
                name: 'Area 51 Lot',
                zone: 'A',
                address: '123 Desert Rd',
                latitude: 0,
                longitude: 0,
                capacity: 100,
                availableSpots: 42,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Student'],
                ticketPrice: 75
              },
            ]
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
              id: '123',
              licensePlate: '1XXX000',
              driver: 'driver111',
              make: 'Toyota',
              model: 'Corolla',
              color: 'white'
            }
          }
        })
      } as Response)
    }
    if (String(url).startsWith('http://localhost:3010/api/v0/auth/user')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          id: '123',
          name: 'nickdriver',
          email: 'nick@books.com'
        }),
      } as Response)
    }
    console.log('Unknown fetch URL:', url)
    return Promise.reject(new Error('Unknown fetch: ' + url))
  })

  render(<PermitPage />)

  const lotSelect = screen.getByLabelText('Current Parking Lot')
  await userEvent.click(lotSelect)
  await userEvent.click(screen.getByText('Area 51 Lot'))


  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '1XXX000')
  await userEvent.click(screen.getByText('Search'))
  
  await userEvent.click(await screen.findByText('Issue Ticket'))
  
  const dialog = await screen.findByRole('dialog')
  console.log(prettyDOM(dialog)) 
  
  const violation = screen.getByPlaceholderText('No Permit, Wrong Lot, Expired Permit')
  await userEvent.type(violation, 'Expired Permit')
  const description = screen.getByLabelText(/Description.*Required/i)
  await userEvent.type(description, 'no valid permit')
  
  const issueButton = within(dialog).getByText('Issue Ticket')
  await userEvent.click(issueButton)

  // await screen.findByText('Ticket issued successfully')
}, 10000)

it("not all the required fields get filled out in the ticket ", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url) => {
    if (url === 'http://localhost:4000/graphql') {
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
                  isValid: false,
                  driverID: 'driver111',
                  vehicleID: 'car111'
                }
              ]
            }
          }),
      } as Response)
    }
    if (url === 'http://localhost:4010/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            ticketIssue: {
              id: '1234',
              driverID: 'driver111',
              enforcer: '1111',
              lot: 'Area 51 Lot',
              paid: false,
              description: 'no valid permit',
              due: '2025-06-20',
              issue: '2025-05-24',
              violation: 'Expired Permit',
              image: 'car.jpg',
              cost: 50,
            }
          }
        }),
      } as Response)
    }
    if (url === 'http://localhost:4040/graphql') {
      return Promise.resolve({ 
        status: 200,
        json: () => Promise.resolve({
          data: {
            getAll: [
              {
                id: 'l1',
                name: 'Area 51 Lot',
                zone: 'A',
                address: '123 Desert Rd',
                latitude: 0,
                longitude: 0,
                capacity: 100,
                availableSpots: 42,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Student'],
                ticketPrice: 75
              },
            ]
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
              id: '123',
              licensePlate: '1XXX000',
              driver: 'driver111',
              make: 'Toyota',
              model: 'Corolla',
              color: 'white'
            }
          }
        })
      } as Response)
    }
    if (String(url).startsWith('http://localhost:3010/api/v0/auth/user')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          id: '123',
          name: 'nickdriver',
          email: 'nick@books.com'
        }),
      } as Response)
    }
    return Promise.reject(new Error('Unknown fetch: ' + url))
  })
  render(<PermitPage />)
  const lotSelect = screen.getByLabelText('Current Parking Lot')
  await userEvent.click(lotSelect)
  await userEvent.click(screen.getByText('Area 51 Lot'))
  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '1XXX000')
  await userEvent.click(screen.getByText('Search'))
  await userEvent.click(screen.getByText('Issue Ticket'))
  /* https://testing-library.com/docs/dom-testing-library/api-within/ */
  const dialog = screen.getByRole('dialog')
  console.log(prettyDOM(dialog)) 
  
  const violation = screen.getByPlaceholderText('No Permit, Wrong Lot, Expired Permit')
  await userEvent.type(violation, 'No Permit')
  
  const fine = screen.getByLabelText(/fine/i)
  await userEvent.type(fine, '12')
  
  const issueButton = within(dialog).getByText('Issue Ticket')
  await userEvent.click(issueButton)
  await screen.findByText('Please fill in all required fields *')
})

it("failed to issue ticket", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url) => {
    if (url === 'http://localhost:4000/graphql') {
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
                  isValid: false,
                  driverID: 'driver111',
                  vehicleID: 'car111'
                }
              ]
            }
          }),
      } as Response)
    }
    if (url === 'http://localhost:4010/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ data: { ticketIssue: null } })
      } as Response)
    }
    if (url === 'http://localhost:4040/graphql') {
      return Promise.resolve({ 
        status: 200,
        json: () => Promise.resolve({
          data: {
            getAll: [
              {
                id: 'l1',
                name: 'Area 51 Lot',
                zone: 'A',
                address: '123 Desert Rd',
                latitude: 0,
                longitude: 0,
                capacity: 100,
                availableSpots: 42,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Student'],
                ticketPrice: 75
              },
            ]
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
              id: '123',
              licensePlate: '1XXX000',
              driver: 'driver111',
              make: 'Toyota',
              model: 'Corolla',
              color: 'white'
            }
          }
        })
      } as Response)
    }
    if (String(url).startsWith('http://localhost:3010/api/v0/auth/user')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          id: '123',
          name: 'nickdriver',
          email: 'nick@books.com'
        }),
      } as Response)
    }
    return Promise.reject(new Error('Unknown fetch: ' + url))
  })
  render(<PermitPage />)
  const lotSelect = screen.getByLabelText('Current Parking Lot')
  await userEvent.click(lotSelect)
  await userEvent.click(screen.getByText('Area 51 Lot'))

  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '1XXX000')
  await userEvent.click(screen.getByText('Search'))
  await userEvent.click(screen.getByText('Issue Ticket'))
  /* https://testing-library.com/docs/dom-testing-library/api-within/ */
  const dialog = screen.getByRole('dialog')
  console.log(prettyDOM(dialog)) 
  
  const violation = screen.getByPlaceholderText('No Permit, Wrong Lot, Expired Permit')
  await userEvent.type(violation, 'Expired Permit')
  
  const description = screen.getByPlaceholderText('Provide details about the violation')
  await userEvent.type(description, 'no valid permit')
  
  const issueButton = within(dialog).getByText('Issue Ticket')
  await userEvent.click(issueButton)
  await screen.findByText('Failed to issue ticket')
}, { timeout: 10000 })