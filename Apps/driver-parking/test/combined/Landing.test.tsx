import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import HomePage from '../../src/app/[locale]/page'
import { landing as landingMessages } from '../../messages/en.json'
// https://chatgpt.com/g/g-p-6812f0a14ce48191b88ff0acaa65015c-virtual-park-app/c/6812f1f1-1608-8007-a132-0de188c60fc6

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{landing: landingMessages}}>
      {component}
    </NextIntlClientProvider>
  )
}

it('should log out user when clicking logout button', async () => {
  const mockPush = vi.fn()
  const mockDelete = vi.fn()

  vi.mocked(cookies).mockReturnValue({ delete: mockDelete } as any)
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)

  renderWithIntl(<HomePage />);

  const logoutButton = screen.getByText('LOG OUT');
  await userEvent.click(logoutButton);

  expect(mockDelete).toHaveBeenCalledWith('session');

  expect(mockPush).toHaveBeenCalledWith('/login');
});