import { signup } from '../../src/app/signup/actions';
import { signupUser } from '../../src/auth/service';
import { cookies } from 'next/headers';
import { vi, beforeEach, it, expect} from 'vitest';


vi.mock('../../src/auth/service', () => ({
  signupUser: vi.fn()
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

const mockSignupUser = signupUser as ReturnType<typeof vi.fn>

it('should return authenticated user when signup is successful', async () => {
  mockSignupUser.mockResolvedValueOnce({name: 'Molly Member'})
  const signupData = {
    email: 'molly@books.com',
    name: 'Molly Member',
    password: 'mollymember'
  };
  await signup(signupData);
  expect(signupUser).toHaveBeenCalledWith(signupData);
});

it('should return undefined when authentication fails', async () => {
  mockSignupUser.mockResolvedValueOnce(undefined)
  const signupData = {
    email: 'molly@books.com',
    name: 'Molly Member',
    password: 'mollymember'
  };
  const result = await signup(signupData);
  expect(result).toBeUndefined();
});
