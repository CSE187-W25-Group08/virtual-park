import { it, afterEach, vi, expect} from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

import Dashboard from '../../src/app/[locale]/dashboard/Dashboard';
import { dashboard as dashboardMessages } from '../../messages/en.json';
import { permit_history as permitHistoryMessages } from '../../messages/en.json';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../src/app/[locale]/ticket/actions', () => ({
  listUnpaid: vi.fn(),
}));

vi.mock('../../src/app/[locale]/register/actions', () => ({
  getUserVehicles: vi.fn(),
}));

vi.mock('../../src/app/[locale]/dashboard/actions', () => ({
  getActivePermit: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: vi.fn(),
    get: vi.fn(() => ({ value: 'token' })),
    delete: vi.fn(),
  }),
}));

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

it('renders the welcome message with the user name', async () => {
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: vi.fn((key) => (key === 'name' ? 'Molly Member' : null)),
    }
  });

  renderWithIntl(<Dashboard />);

  await screen.getByText('Molly Member');
});

it('renders the active vehicle', async () => {
  renderWithIntl(<Dashboard />);

  await screen.getByText('No active vehicle.');
});

it('renders the active permit section with no active permit', async () => {
  renderWithIntl(<Dashboard />);

  await screen.getByText('You have no active permit.');
});

it('renders the unpaid tickets section', async () => {
  renderWithIntl(<Dashboard />);

  await screen.getByText('Manage Tickets');
});

// it('clicks "Buy Permit" button', async () => {
//   renderWithIntl(<Dashboard />);

//   const buyPermit = screen.getByText('Buy Permit');

//   const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
//   fireEvent.click(buyPermit);

//   expect(alertMock).toHaveBeenCalledWith('You have bought a permit.');
//   alertMock.mockRestore();
// });

it('goes to ticket page when "Manage Tickets" is clicked', async () => {
  const mockPush = vi.fn();
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);

  renderWithIntl(<Dashboard />);

  const manageTickets = await screen.findByText('Manage Tickets');

  fireEvent.click(manageTickets);
  expect(mockPush).toHaveBeenCalledWith("/ticket");
});