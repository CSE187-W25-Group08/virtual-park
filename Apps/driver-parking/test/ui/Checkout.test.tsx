import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { it, afterEach, vi, expect } from 'vitest';
import Checkout from '../../src/app/[locale]/checkout/View';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { checkout as checkoutMessages } from '../../messages/en.json';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ checkout: checkoutMessages }}>
      {component}
    </NextIntlClientProvider>
  )
}

it('renders the app bar and go back button', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Checkout type="permit" amount={6} status="success" />);
  const backButton = await screen.getByLabelText('back');
  fireEvent.click(backButton);
  expect(mockPush).toHaveBeenCalledWith('/permit/purchase');
});

it('renders successful purchase', async () => {
  renderWithIntl(<Checkout type="permit" amount={6} status="success" />);
  await screen.getByText('Purchase Successful');
});

it('renders cancelled purchase', async () => {
  renderWithIntl(<Checkout type="permit" amount={6} status="cancel" />);
  await screen.getByText('Purchase Cancelled');
});

it('navigates to /dashboard when dashboard button is clicked', async () => {
  const mockPush = vi.fn()
  vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
  renderWithIntl(<Checkout type="permit" amount={6} status="success" />);
  const dashboardButton = await screen.getByText('Go to Dashboard');
  fireEvent.click(dashboardButton);
  expect(mockPush).toHaveBeenCalledWith('/dashboard');
});