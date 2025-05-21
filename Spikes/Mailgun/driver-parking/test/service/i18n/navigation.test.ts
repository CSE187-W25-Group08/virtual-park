import { it, expect, vi } from 'vitest';
import { createNavigation } from 'next-intl/navigation';
import { routing } from '../../../src/i18n/routing';
import { Link, redirect, usePathname, useRouter, getPathname } from '../../../src/i18n/navigation';

vi.mock('next-intl/navigation', () => ({
  createNavigation: vi.fn(() => ({
    Link: 'link',
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
    getPathname: vi.fn(),
  })),
}));

it('should call createNavigation with the routing object', () => {
  expect(createNavigation).toHaveBeenCalledWith(routing);
});

it('should export Link', () => {
  expect(Link).toBe('link');
});

it('should export redirect', () => {
  expect(typeof redirect).toBe('function');
});

it('should export usePathname', () => {
  expect(typeof usePathname).toBe('function');
});

it('should export useRouter', () => {
  expect(typeof useRouter).toBe('function');
});

it('should export getPathname', () => {
  expect(typeof getPathname).toBe('function');
});