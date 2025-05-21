import { it, afterEach, vi, beforeEach, expect } from 'vitest' 
// import { render, screen, cleanup, within } from '@testing-library/react'
import { screen, within, prettyDOM, render, cleanup } from '@testing-library/react'
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
// vi.mock('next/headers', () => ({
//   cookies: () => ({
//     get: vi.fn().mockReturnValue({ value: 'test-session-cookie' }),
//     set: vi.fn(),
//     delete: vi.fn(),
//   }),
// }))

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

it("issue ticket button test", async () => {
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
  await userEvent.click(screen.getByText('Issue Ticket'))
  await screen.findByText('Issue Parking Ticket')
})


it("issue ticket successfully", async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (
      url === 'http://localhost:4000/graphql' 
    ) {
      console.log('fetch called with permit:', url, options)
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

    if (url === 'http://localhost:4010/graphql') {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            ticketIssue: {
              id: '1234',
              driverID: '1222',
              enforcer: '1111',
              lot: 'lot 101',
              paid: false,
              description: 'no permit',
              due: '4/20/2025',
              issue: '5/20/2025',
              violation: 'no permit',
              image: 'car.jpg',
              cost: 12,
            }
          }
        }),
      } as Response)
    }


    return Promise.reject(new Error('Unknown fetch'))
  })

  render(<PermitPage />)

  await userEvent.type(screen.getByPlaceholderText('Enter car plate number'), '123ABC')
  await userEvent.click(screen.getByText('Search'))
  await userEvent.click(screen.getByText('Issue Ticket'))
  /* https://testing-library.com/docs/dom-testing-library/api-within/ */
  const dialog = screen.getByRole('dialog')
  console.log(prettyDOM(dialog)) 
  const lotSelect = within(dialog).getByRole('combobox')
  await userEvent.click(lotSelect)
  
  const lotOption = await screen.findByText('Area 51 Lot')
  await userEvent.click(lotOption)
  
  const violation = screen.getByPlaceholderText('Permit expired?')
  await userEvent.type(violation, 'Expired Permit')
  
  const description = screen.getByPlaceholderText('Provide details about the violation')
  await userEvent.type(description, 'no valid permit')
  
  const issueButton = within(dialog).getByText('Issue Ticket')
  await userEvent.click(issueButton)
  // await screen.findByText('Failed to issue ticket')
  await screen.findByText('Ticket 1234 issued successfully')
})