import { it, expect, vi, beforeEach } from 'vitest';
import nextConfig from '../../next.config'


it('exports a NextConfig object', () => {
  expect(typeof nextConfig).toBe('object')
})
