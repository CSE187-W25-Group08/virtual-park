import { it, afterEach, vi, expect, beforeEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import Dashboard from '../../src/app/[locale]/dashboard/Dashboard';
import { dashboard as dashboardMessages } from '../../messages/en.json';
import { permit_history as permitHistoryMessages } from '../../messages/en.json';
import { getActivePermit } from '../../src/app/[locale]/dashboard/actions';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../src/app/[locale]/ticket/actions', () => ({
  listUnpaid: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'token' })),
    delete: vi.fn(),
  }),
}));

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve(
      new Response(JSON.stringify({
        data: {
          primaryVehicle: null,
        },
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )
  ));
});


afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ dashboard: dashboardMessages, permit_history: permitHistoryMessages }}>
      {component}
    </NextIntlClientProvider>
  );
};

it('renders the active permit section with no active permit', async () => {
  renderWithIntl(<Dashboard />);

  await screen.getByText('You have no active permit.');
});

it('renders the unpaid tickets section', async () => {
  renderWithIntl(<Dashboard />);

  await screen.getByLabelText('Manage Tickets');
});

it('goes to ticket page when "Manage Tickets" is clicked', async () => {
  const mockPush = vi.fn();
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);

  renderWithIntl(<Dashboard />);

  const manageTickets = await screen.findByLabelText('Manage Tickets');

  fireEvent.click(manageTickets);
  expect(mockPush).toHaveBeenCalledWith("/ticket");
});

it('renders active permit', async () => {
  vi.mock('../../src/app/[locale]/dashboard/actions', () => ({
    getActivePermit: vi.fn()
  }));

  vi.mocked(getActivePermit).mockResolvedValue(
    [
      {
        id: '1',
        type: 'Daily',
        issueDate: '2025-01-01',
        expDate: '2025-01-01',
        price: 5,
        permitClass: 'Visitor'
      }
    ]);

  vi.mocked(fetch).mockImplementation((url, options) => {
    if (url?.toString().includes('/graphql')) {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          data: {
            getActivePermit: [
              {
                id: '1',
                type: 'Daily',
                issueDate: '2025-01-01',
                expDate: '2025-01-01',
                price: 5,
                permitClass: 'Visitor',
              }
            ],
          },
        }),
      } as Response)
    }
    return Promise.reject('Unknown fetch')
  })

  renderWithIntl(<Dashboard />)

  await screen.findByText('Daily')
})

it('Renders the Buy Permit button', async () => {
  renderWithIntl(<Dashboard />)

  await screen.findByLabelText('Buy Daily Permit')
})
