import { getUserPermits } from '../../src/app/permit/actions';
import { getPermitByDriver } from '../../src/permit/service';
import { cookies } from 'next/headers';
import { vi, beforeEach, it, expect} from 'vitest';


vi.mock('../../src/permit/service', () => ({
  getPermitByDriver: vi.fn()
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn()
}));

const mockCookies = {
  get: vi.fn()
};

beforeEach(() => {
  vi.clearAllMocks();
  /* reference: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html */
  vi.mocked(cookies).mockReturnValue(mockCookies as any);
});

const mockGetPermitByDriver = getPermitByDriver as ReturnType<typeof vi.fn>

it('should return driver\'s purchased permit list', async () => {
  mockCookies.get.mockReturnValueOnce({value: 'token'});

  mockGetPermitByDriver.mockResolvedValueOnce(
    {
      type: 'Student',
      issueDate: '2025-01-01',
      expDate: '2025-01-01',
      price: 3.14
    }
  )
  const signupData = {
    email: 'molly@books.com',
    name: 'Molly Member',
    password: 'mollymember'
  };
  await getUserPermits();
  expect(getPermitByDriver).toHaveBeenCalledWith('token');
});
