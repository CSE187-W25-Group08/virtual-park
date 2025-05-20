import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

interface AuthEnv {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
}

function getAuthConfig(): AuthEnv {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error(
      "Env variables missing google client id and google client secret"
    )
  }

  return {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getAuthConfig().GOOGLE_CLIENT_ID,
      clientSecret: getAuthConfig().GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)