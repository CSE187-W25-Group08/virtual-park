import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LocaleSwitcher from '../../src/app/languageSwitcher/_ActualLocaleSwitcher';
import { vi, it, expect, afterEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { common as commonMessages } from '../../messages/en.json';
import * as nav from '@/i18n/navigation';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/current-path',
}));
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/current-path',
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={{ common: commonMessages }}>
      {component}
    </NextIntlClientProvider>
  );
}

it('renders the language icon button with tooltip', async () => {
  renderWithIntl(<LocaleSwitcher />);
  await screen.getByLabelText('select language');
});

it('renders Spanish', async () => {
  renderWithIntl(<LocaleSwitcher />);
  const intl = await screen.getByLabelText('select language');
  fireEvent.click(intl);
  fireEvent.click(await screen.getByText('Spanish'));
});

it('renders English', async () => {
  renderWithIntl(<LocaleSwitcher />);
  const intl = await screen.getByLabelText('select language');
  fireEvent.click(intl);
  fireEvent.click(await screen.getByText('English'));
});