import { render, cleanup } from '@testing-library/react';
import { vi, it, afterEach } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import {checkout as checkoutMessages} from '../../messages/en.json';
import Page from '../../src/app/[locale]/checkout/page';

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'type') return 'permit';
      if (key === 'amount') return '6';
      if (key === 'status') return 'success';
      return '';
    },
  }),
  useRouter: vi.fn()
}));

vi.mock('./View', () => ({
  __esModule: true,
  default: (props: any) => (
    <div>
      MockCheckout: {props.type}, {props.amount}, {props.status}
    </div>
  ),
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

it('render Checkout page', async () => {
  renderWithIntl(<Page />);
});