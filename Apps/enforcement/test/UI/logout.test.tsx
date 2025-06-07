import { it, afterEach, vi, beforeEach, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import PermitPage from '../../src/app/permit/page'

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  }))
}))

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn().mockReturnValue({value: 'session-cookie'}),
    delete: vi.fn(),
  }),
}))

vi.mock('../../src/app/login/action', () => ({
  login: vi.fn(),
  logout: vi.fn()
}))


beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
  const mockSessionStorage = {
    clear: vi.fn()
  }
  vi.stubGlobal('sessionStorage', mockSessionStorage)
})

afterEach(() => {
  cleanup()
})

const mockLotsFetch = () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
  const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
  const query = body.query || ''
  if (query.includes('getAll')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        data: { getAll: []}
      }),
    } as Response)
  }
  return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any
}

it('should handle logout button click and redirect', async () => {
  mockLotsFetch();
  const loginActions = await import('../../src/app/login/action')
  const mockLogout = vi.fn().mockResolvedValue(undefined)
  loginActions.logout = mockLogout
  render(<PermitPage />)
  const logoutButton = screen.getByLabelText('exit')
  await userEvent.click(logoutButton)
  await waitFor(() => {
    expect(mockLogout).toHaveBeenCalledOnce()
  })
  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})