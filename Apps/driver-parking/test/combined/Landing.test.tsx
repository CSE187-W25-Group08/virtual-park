import { it, afterEach, vi, expect, beforeEach } from 'vitest' 
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { testLots } from '../testData'
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
  // https://chatgpt.com/c/683b7c89-1ce4-8007-a0ea-ef438cd664e9
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: query === '(max-width:600px)' || query === '(max-width:599px)',
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  // https://chatgpt.com/c/68224fea-167c-8007-b525-2167c07b5496
  vi.stubGlobal('location', {
    ...window.location,
    reload: vi.fn(),
  });
  vi.stubGlobal('fetch', vi.fn())
});

const mockLotsFetch = () => {
  vi.mocked(fetch).mockImplementation((url, options) => {
  const body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}
  const query = body.query || ''
  if (query.includes('getAll')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        data: { getAll: testLots }
      }),
    } as Response)
  }
  return Promise.reject(new Error('Unhandled GraphQL query'))
  }) as any
}

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
  mockLotsFetch();
  renderWithIntl(<HomePage />);
  const menuButton = screen.getByLabelText("menu options")
  await userEvent.click(menuButton)
  const logoutButton = screen.getByText('Log Out');
  await userEvent.click(logoutButton);

  expect(mockDelete).toHaveBeenCalledWith('session');
});

// https://chatgpt.com/c/683b7c89-1ce4-8007-a0ea-ef438cd664e9
it('renders lot list autocomplete with fetched options', async () => {
  mockLotsFetch();
  renderWithIntl(<HomePage />);
  const input = await screen.findByLabelText('Search by lot name');
  await userEvent.click(input);
  await screen.findByText('Lot 162')
});

it('selects a lot and shows its details', async () => {
  mockLotsFetch();
  renderWithIntl(<HomePage />);
  const input = await screen.findByLabelText('Search by lot name');
  await userEvent.click(input);
  const lotToSelect = await screen.findByText('Lot 208');
  await userEvent.click(lotToSelect);
  await screen.findByText(/East Remote/)
});


it('selects a lot and shows its details', async () => {
  mockLotsFetch();
  renderWithIntl(<HomePage />);
  const input = await screen.findByLabelText('Search by lot name');
  await userEvent.click(input);
  const lotToSelect = await screen.findByText('Lot 208');
  await userEvent.click(lotToSelect);
  const buy = await screen.findByText('Buy Permit');
  await userEvent.click(buy);
  expect(mockPush).toHaveBeenCalledWith('/permit/purchase');
});

it('shows "No lots available" when search has no match', async () => {
  mockLotsFetch();
  renderWithIntl(<HomePage />);
  const input = await screen.findByLabelText('Search by lot name');
  await userEvent.type(input, 'Nonexistent Lot');
  await screen.findByText('No lots found')
});