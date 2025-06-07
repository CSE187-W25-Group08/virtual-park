import { it, afterEach, vi, beforeEach, expect, describe } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

import RegisterVehiclesPage from '../../src/app/[locale]/register/page'
import { RegisterService } from '../../src/register/service'
import { vehicle as vehicleMessages } from '../../messages/en.json'
import { ac } from 'vitest/dist/chunks/reporters.d.79o4mouw'

// Mock router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

// Mock next/headers for session cookie
vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'mock-session-token' })),
    delete: vi.fn(),
  }),
}))

// Setup global fetch mock
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ vehicle: vehicleMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

const inputVehicle = {
    licensePlate: 'v123',
    make: 'toyota',
    model: 'corolla',
    color: 'red',
    vehicleType: 'Car',
    active: true,
}


it('should render RegisterVehiclesPage', async () => {
  renderWithIntl(<RegisterVehiclesPage />)
  await screen.findByText(/Register/i)
})

describe('RegisterService.getVehicleById', () => {
  const service = new RegisterService()

  it('should fetch vehicle by ID successfully', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({
          data: {
            getVehicleById: {
              id: 'v123',
              licensePlate: 'ABC123',
              driver: 'user1',
              make: 'Toyota',
              model: 'Corolla',
              color: 'Blue',
            },
          },
        }),
    } as Response)

    const vehicle = await service.getVehicleById('mock-session-token', 'v123')

    expect(vehicle).toEqual({
      id: 'v123',
      licensePlate: 'ABC123',
      driver: 'user1',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Blue',
    })
  })

  it('should reject with Unauthorized when status is not 200', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 401,
      json: () => Promise.resolve({}),
    } as Response)

    await expect(
      service.getVehicleById('invalid-token', 'v123')
    ).rejects.toBe('Unauthorized')
  })
})

describe('RegisterService.getUserVehicles', () => {
  const service = new RegisterService()

  it('should fetch vehicle by user ID successfully', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({
          data: {
            userVehicle : [{
              id: 'v123',
              licensePlate: 'ABC123',
              driver: 'user1',
              make: 'Toyota',
              model: 'Corolla',
              color: 'Blue',
            }],
          },
        }),
    } as Response)

    const vehicle = await service.getUserVehicles('mock-session-token')

    expect(vehicle[0]).toEqual({
      id: 'v123',
      licensePlate: 'ABC123',
      driver: 'user1',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Blue',
    })
  })

  it('should reject with Unauthorized when status is not 200', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 401,
      json: () => Promise.resolve({}),
    } as Response)

    await expect(
      service.getUserVehicles('invalid-token')
    ).rejects.toBe('Unauthorized')
  })
})

describe('RegisterService.registerVehicle', () => {
  const service = new RegisterService()

  it('should register vehicle successfully', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({
          data: {
            registerVehicle: {
              id: 'v123',
              licensePlate: 'v123',
              driver: 'user1',
              make: 'toyota',
              model: 'corolla',
              color: 'red',
            },
          },
        }),
    } as Response)

    const vehicle = await service.registerVehicle('mock-session-token', inputVehicle)

    expect(vehicle).toEqual({
        id: 'v123',
        licensePlate: 'v123',
        driver: 'user1',
        make: 'toyota',
        model: 'corolla',
        color: 'red',
    })
  })

  it('should reject with Unauthorized when status is not 200', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 401,
      json: () => Promise.resolve({}),
    } as Response)

    await expect(
      service.registerVehicle('invalid-token', inputVehicle)
    ).rejects.toBe('Unauthorized')
  })
})

describe('RegisterService.getPrimaryVehicle', () => {
  const service = new RegisterService()

  it('should fetch primary vehicle successfully', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 200,
      json: () =>
        Promise.resolve({
          data: {
            primaryVehicle : {
              id: 'v123',
              licensePlate: 'ABC123',
              driver: 'user1',
              make: 'Toyota',
              model: 'Corolla',
              color: 'Blue',
            },
          },
        }),
    } as Response)

    const vehicle = await service.getPrimaryVehicle('mock-session-token')

    expect(vehicle).toEqual({
      id: 'v123',
      licensePlate: 'ABC123',
      driver: 'user1',
      make: 'Toyota',
      model: 'Corolla',
      color: 'Blue',
    })
  })

  it('should reject with Unauthorized when status is not 200', async () => {
    vi.mocked(fetch).mockResolvedValue({
      status: 401,
      json: () => Promise.resolve({}),
    } as Response)

    await expect(
      service.getPrimaryVehicle('invalid-token')
    ).rejects.toBe('Unauthorized')
  })
})