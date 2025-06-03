import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
import '@testing-library/jest-dom/vitest'
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
import { UnregisterVehicle } from '../../src/vehicle/service'

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

// beforeEach(() => {
//   vi.stubGlobal('fetch', vi.fn())
// })
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ 
        data: { 
          getAll: [],
          getPermitBycarPlate: []
        } 
      }),
    } as Response)
  }))
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
    vi.mocked(fetch).mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve({
      data: {
        getAll: [{ id: 'lot-123', name: 'Lot 139A', validPermits: ['Student'] }],
        getPermitBycarPlate: [{ permitID: '123', permitClass: 'Student', isValid: true }]
      }
    })
  } as Response)

  render(<PermitPage />)
  const lotSelect = screen.getByLabelText('Current Parking Lot')
  await userEvent.click(lotSelect)

  const option = screen.getByRole('option')
  await userEvent.click(option)
  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123ABC')
  const searchButton = screen.getByRole('button', { name: 'Search' })
  await userEvent.click(searchButton)
  screen.getByText('Valid permit found for vehicle 123ABC in Lot 139A')
})

it("should show a error saying please enter a carplate number", async () => {
    vi.mocked(fetch).mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve({
      data: {
        getAll: [{ id: 'lot-123', name: 'Lot 139A', validPermits: ['Student'] }],
        // getPermitBycarPlate: [{ permitID: '123', permitClass: 'Student', isValid: true }]
      }
    })
  } as Response)

  render(<PermitPage />)
  const lotSelect = screen.getByLabelText('Current Parking Lot')
  await userEvent.click(lotSelect)

  const option = screen.getByRole('option')
  await userEvent.click(option)
  await userEvent.click(screen.getByPlaceholderText('Enter car plate number'))
  await userEvent.tab() 
  await userEvent.tab()
  const searchButton = screen.getByText('Search')
  await userEvent.click(searchButton)
  screen.getByText('Please enter a car plate number')
})


it("the search button was disabled when carplate number not enter", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  
  vi.mocked(fetch).mockImplementation((url) => {
    const urlString = url.toString()
    
    if (urlString.includes('localhost:4040/graphql')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          data: {
            getAll: [{ id: 'lot-123', name: 'Lot 139A', validPermits: ['Student'] }]
          }
        }),
      } as Response)
    }
    
    if (urlString.includes('localhost:4000/graphql')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          data: {
            getPermitBycarPlate: []
          }
        }),
      } as Response)
    }
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: {} })
    } as Response)
  })

  render(<PermitPage />)
  const searchButton = screen.getByText('Search')
  expect(searchButton).toBeDisabled()
})

/* reference: https://web.dev/learn/testing/get-started/component-testing */
it('getpermitBycarplate rejects and return authorized error', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 401,
    json: () => Promise.resolve({}),
  } as Response))

  await expect(getPermitByPlate('invalidCookie', 'abc12')).rejects.toBe('Unauthorized')
})

it("should show error and get driverID when no permits found", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url) => {
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
                address: 'ucsc Rd',
                latitude: 0,
                longitude: 0,
                capacity: 0,
                availableSpots: 10,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Student'],
                ticketPrice: 75
              }
            ]
          }
        }),
      } as Response)
    }
    if (url === 'http://localhost:4000/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
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
              id: '123',
              licensePlate: '1234BC4',
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
          id: '111',
          name: 'nickenforcement',
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
  const plateInput = screen.getByPlaceholderText('Enter car plate number')
  await userEvent.clear(plateInput)
  await userEvent.type(plateInput, '123BC4')

  await userEvent.click(await screen.findByText('Search'))
  await screen.findByText('No permits found for this vehicle')

  await screen.findByText('Issue Ticket')
})

it("show set the driverId to empty string when the vehicle is unregistered, and insert this unregistered vehicle into table", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  
  vi.mocked(fetch).mockImplementation((url, options) => {
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
                address: 'ucsc Rd',
                latitude: 0,
                longitude: 0,
                capacity: 0,
                availableSpots: 10,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Student'],
                ticketPrice: 75
              }
            ]
          }
        }),
      } as Response)
    }
    
    if (url === 'http://localhost:4000/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            getPermitBycarPlate: []
          }
        }),
      } as Response)
    }

    if (url === 'http://localhost:4020/graphql') {
      const body = options?.body ? JSON.parse(options.body as string) : null
      if (body.query.includes('getVehicleByPlate')) {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
            data: {
              getVehicleByPlate: []
            }
          })
        } as Response)
      }
      
      if (body.query.includes('UnregisterVehicle')) {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({
            data: {
              UnregisterVehicle: {
                id: 'unregisteredId',
                licensePlate: body.variables.input
              }
            }
          })
        } as Response)
      }
    }
    if (String(url).startsWith('http://localhost:3010/api/v0/auth/user')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          id: '111',
          name: 'nickenforcement',
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
  const plateInput = screen.getByPlaceholderText('Enter car plate number')
  await userEvent.clear(plateInput)
  await userEvent.type(plateInput, '123BC4')

  await userEvent.click(await screen.findByText('Search'))
  await screen.findByText('No permits found for this vehicle')

  await userEvent.click(await screen.findByText('Issue Ticket'))
  
})
// it("show set the driverId to empty string when the vehicle is unregistered", async () => {
//   const mockPush = vi.fn()
//   vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
//   vi.mocked(fetch).mockImplementation((url) => {
//     if (url === 'http://localhost:4040/graphql') {
//       return Promise.resolve({
//         status: 200,
//         json: () => Promise.resolve({
//           data: {
//             getAll: [
//               {
//                 id: 'l1',
//                 name: 'Area 51 Lot',
//                 zone: 'A',
//                 address: 'ucsc Rd',
//                 latitude: 0,
//                 longitude: 0,
//                 capacity: 0,
//                 availableSpots: 10,
//                 isActive: true,
//                 type: 'public',
//                 created: '2025-01-01T00:00:00Z',
//                 updated: '2025-01-02T00:00:00Z',
//                 validPermits: ['Student'],
//                 ticketPrice: 75
//               }
//             ]
//           }
//         }),
//       } as Response)
//     }
//     if (url === 'http://localhost:4000/graphql') {
//       return Promise.resolve({
//         status: 200,
//         json: () => Promise.resolve({
//           data: {
//             getPermitBycarPlate: []
//           }
//         }),
//       } as Response)
//     }

//     if (url === 'http://localhost:4020/graphql' && body.operationName === 'getVehicleByPlate') {
//       return Promise.resolve({
//         status: 200,
//         json: () => Promise.resolve({
//           data: {
//             getVehicleByPlate: []
//           }
//         })
//       } as Response)
//     }

//     if (url === 'http://localhost:4020/graphql' && body.operationName === 'UnregisterVehicle') {
//       return Promise.resolve({
//         status: 200,
//         json: () => Promise.resolve({
//           data: {
//             UnregisterVehicle: {
//               id: 'unregistered-vehicle-id',
//               licensePlate: '12345'
//             }
//           }
//         })
//       } as Response)
//     }

//     if (String(url).startsWith('http://localhost:3010/api/v0/auth/user')) {
//       return Promise.resolve({
//         status: 200,
//         json: () => Promise.resolve({
//           id: '111',
//           name: 'nickenforcement',
//           email: 'nick@books.com'
//         }),
//       } as Response)
//     }
//     return Promise.reject(new Error('Unknown fetch: ' + url))
//   })

//   render(<PermitPage />)

//   const lotSelect = screen.getByLabelText('Current Parking Lot')
//   await userEvent.click(lotSelect)
//   await userEvent.click(screen.getByText('Area 51 Lot'))
//   const plateInput = screen.getByPlaceholderText('Enter car plate number')
//   await userEvent.clear(plateInput)
//   await userEvent.type(plateInput, '123BC4')

//   await userEvent.click(await screen.findByText('Search'))
//   await screen.findByText('No permits found for this vehicle')

//   await screen.findByText('Issue Ticket')
// })

it("should show error when user has a valid permit but not park in the correspond lot", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url) => {
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
                address: 'ucsc Rd',
                latitude: 0,
                longitude: 0,
                capacity: 0,
                availableSpots: 10,
                isActive: true,
                type: 'public',
                created: '2025-01-01T00:00:00Z',
                updated: '2025-01-02T00:00:00Z',
                validPermits: ['Remote'],
                ticketPrice: 75
              }
            ]
          }
        }),
      } as Response)
    }
    if (url === 'http://localhost:4000/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            getPermitBycarPlate: [
              {
                permitID: 'permit111',
                permitType: 'Student',
                permitClass: 'Student',
                issueDate: '2025-05-01',
                expDate: '2025-12-01',
                isValid: true,
                driverID: 'driver111',
                vehicleID: 'car111'
              }
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
              licensePlate: '1234BC4',
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
          id: '111',
          name: 'nickenforcement',
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
  const plateInput = screen.getByPlaceholderText('Enter car plate number')
  await userEvent.clear(plateInput)
  await userEvent.type(plateInput, '123BC4')

  await userEvent.click(await screen.findByText('Search'))
  await screen.findByText('Vehicle has Student permit(s), valid permits for Area 51 Lot: Remote')
})
// it('test recognizePlateFromImage no license', async () => {
//   vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
//     status: 401,
//     json: () => Promise.resolve({}),
//   } as Response))

//   await expect(recognizePlateFromImage('invalidCookie', 'abc12'))
//     .rejects
//     .toBe('Unauthorized')
// })


// it("should show an permit found for the vehicle error", async () => {
//   const mockPush = vi.fn()
//   vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
//   vi.mocked(fetch).mockImplementation((url, options) => {
//     if (
//       url === 'http://localhost:4000/graphql' 
//     ) {
//       return Promise.resolve({
//         status: 200,
//         json: () =>
//           Promise.resolve({
//             data: {
//               getPermitBycarPlate: []
//             }
//           }),
//       } as Response)
//     }
//     if (url === 'http://localhost:4020/graphql') {
//     return Promise.resolve({
//       status: 200,
//       json: () => Promise.resolve({
//         data: {
//           getVehicleByPlate: {
//             id: 'vehicle101',
//             licensePlate: '123owo',
//             driver: 'driver0827',
//             make: 'Toyota',
//             model: 'Corolla',
//             color: 'white'
//           }
//         }
//       })
//     } as Response)
//   }

//     return Promise.reject(new Error('Unknown fetch'))
//   })

//   render(<PermitPage />)
//   await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123owo')
//   await userEvent.click(screen.getByText('Search'))
//   await screen.findByText('No permits found for this vehicle')
// })


// it("should show red row color when the permit is invalid", async () => {
//   const mockPush = vi.fn()
//   vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
//   vi.mocked(fetch).mockImplementation((url, options) => {
//     if (
//       url === 'http://localhost:4000/graphql' 
//     ) {
//       return Promise.resolve({
//         status: 200,
//         json: () =>
//           Promise.resolve({
//             data: {
//               getPermitBycarPlate: [
//                 {
//                   permitID: '123',
//                   permitType: 'Student',
//                   issueDate: '2025-05-01',
//                   expDate: '2025-06-01',
//                   isValid: false
//                 }
//               ]
//             }
//           }),
//       } as Response)
//     }

//     return Promise.reject(new Error('Unknown fetch'))
//   })

//   render(<PermitPage />)

//   await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123ABC')
//   await userEvent.click(screen.getByText('Search'))
// })