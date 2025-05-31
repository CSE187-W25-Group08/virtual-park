import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import HomePage from '../../src/app/[locale]/page'
import { landing as landingMessages } from '../../messages/en.json'
// https://chatgpt.com/g/g-p-6812f0a14ce48191b88ff0acaa65015c-virtual-park-app/c/6812f1f1-1608-8007-a132-0de188c60fc6

const mockPush = vi.fn();
const mockDelete = vi.fn();

vi.mock('next/headers', () => {
  return {
    cookies: vi.fn(() => ({
      set: vi.fn(),
      get: vi.fn(),
      delete: mockDelete,
    })),
  };
});

vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

// https://chatgpt.com/c/68181767-3d18-8007-b12f-c9c6fa53ba52
beforeEach(() => {
  vi.stubGlobal('sessionStorage', {
    getItem: vi.fn((key) => {
      if (key === 'name') return 'true';
      return null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    key: vi.fn(),
    length: 0
  });

  // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
  vi.stubGlobal('location', {
    ...window.location,
    reload: vi.fn(),
  });
});


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
  renderWithIntl(<HomePage />);

  const logoutButton = screen.getByText('Logout');
  await userEvent.click(logoutButton);


  expect(mockDelete).toHaveBeenCalledWith('session');
});