import { SignJWT, jwtVerify} from 'jose'

const encodedKey = new TextEncoder().encode(process.env.MASTER_SECRET)

export async function encrypt(userId: string): Promise<string> {
  return new SignJWT({id: userId})
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('30m')
  .sign(encodedKey)
}

export async function decrypt(token: string | undefined = ''): Promise<string> {
  const { payload } = await jwtVerify(token, encodedKey, {
    algorithms: ['HS256'],
  })
  return payload.id + ''
}