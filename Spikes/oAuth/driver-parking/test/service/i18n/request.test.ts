import { it, expect, vi } from 'vitest';
import { hasLocale } from 'next-intl';
import requestConfig from '../../../src/i18n/request';
import { routing } from '../../../src/i18n/routing';

vi.mock('next-intl/server', () => ({
  getRequestConfig: vi.fn((callback) => callback),
}));

vi.mock('next-intl', () => ({
  hasLocale: vi.fn(),
}));

it('should return en locale', async () => {
  vi.mocked(hasLocale).mockReturnValue(true);

  const config = await requestConfig({ requestLocale: Promise.resolve('es') });
  expect(config.locale).toBe('es');
});

it('should use defaultLocale if locale isn\'t supported', async () => {
  vi.mocked(hasLocale).mockReturnValue(false);

  const config = await requestConfig({ requestLocale: Promise.resolve('fr') });
  expect(config.locale).toBe(routing.defaultLocale);
});