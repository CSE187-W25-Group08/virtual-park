import { it, afterEach, vi, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import PurchaseHistoryPage from '../../src/app/[locale]/permit/history/page'

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

it('should fetch user\'s purchased permits', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/graphql')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            permitsByDriver: [
              {
                id: '1',
                type: 'Student',
                issueDate: '2025-01-01',
                expDate: '2025-01-01',
                price: 3.14,
              },
              {
                id: '2',
                type: 'Staff',
                issueDate: '2025-02-01',
                expDate: '2025-02-01',
                price: 6.14,
              },
            ],
          },
        }),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  render(<PurchaseHistoryPage />)

  await screen.findByText('Student')
})