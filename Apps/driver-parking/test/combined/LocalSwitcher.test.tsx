import { cleanup, render, screen } from '@testing-library/react';
import { vi, it, afterEach } from 'vitest';
import LocaleSwitcher from '../../src/app/languageSwitcher/LocaleSwitcher';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
})

vi.mock('../../src/app/languageSwitcher/_ActualLocaleSwitcher', () => ({
  __esModule: true,
  default: () => <div>Actual Switcher Loaded</div>,
}));

it('renders the dynamically loaded switcher', async () => {
  render(<LocaleSwitcher />);
  await screen.findByText('Actual Switcher Loaded');
});