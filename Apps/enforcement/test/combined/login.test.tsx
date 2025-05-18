import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Page from '../../src/app/login/page'
import React from 'react'

// mock next.js stuff navigation and cookies
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

it('should call login and redirect on valid credentials', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  vi.mocked(fetch).mockImplementation((url) => {
    
    if (url?.toString().includes('/login')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ name: 'nick enforcement', accessToken: 'abcd1234' }),
      } as Response);
    }
    
    if (url?.toString().includes('/enforcementCheck')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      } as Response);
    }
    
    console.log('Unknown URL in mock fetch:', url?.toString());
    return Promise.reject('Unknown fetch');
  });

  render(<Page />)

  await userEvent.type(screen.getByPlaceholderText('Email Address'), 'nick@books.com')
  await userEvent.type(screen.getByPlaceholderText('Password'), 'nickenforcement')
  await userEvent.click(screen.getByText('Sign in'))

  await vi.waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})

it('Login denies invalid credentials', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  // Mock fetch to simulate both login + check API
  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/login')) {
      return Promise.resolve({
        status: 401,
        json: () => Promise.resolve(undefined),
      } as Response)
    }
    if (url?.toString().includes('/check')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  render(<Page />)

  await userEvent.type(screen.getByPlaceholderText('Email Address'), 'nick@books.com')
  await userEvent.type(screen.getByPlaceholderText('Password'), 'nickenforcement')
  await userEvent.click(screen.getByText('Sign in'))

  // await screen.findByText('Incorrect login credentials, please try again');
})