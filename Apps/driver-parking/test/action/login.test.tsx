import { login } from '../../src/app/login/action';
import { authenticate } from '../../src/auth/service';
import { cookies } from 'next/headers';
import { vi, beforeEach, it, expect} from 'vitest';


vi.mock('../../src/auth/service', () => ({
  authenticate: vi.fn()
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn()
}));

const mockCookies = {
  set: vi.fn()
};

beforeEach(() => {
  vi.clearAllMocks();
  /* reference: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html */
  vi.mocked(cookies).mockReturnValue(mockCookies as any);
});

it('should return authenticated user when credentials are valid', async () => {
  const mockUser = {
    name: 'molly',
    accessToken: '1010'
  };
  vi.mocked(authenticate).mockImplementation(() => Promise.resolve(mockUser));
  const credentials = {
    email: 'molly@books.com',
    password: '123'
  };
  await login(credentials);
  expect(authenticate).toHaveBeenCalledWith(credentials);
});

it('should return undefined when authentication fails', async () => {
  vi.mocked(authenticate).mockResolvedValue(undefined);
  const credentials = {
    email: 'invalid@books.com',
    password: 'Invalid'
  };
  const result = await login(credentials);
  expect(result).toBeUndefined();
});
