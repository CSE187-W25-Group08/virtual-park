import { Session } from "next-auth"
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from "./NextAuth";

export async function OAuthSessionUser(req: NextApiRequest, res: NextApiResponse): Promise<Session | undefined> {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ error: "Unauthenticated user" })
    return
  }

  res.json({
    user: session.user
  })
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'You must be signed in to view this protected content.' });
    return;
  }

  // If user is authenticated, return API data
  res.status(200).json({
    message: 'Protected data available for signed-in users.'
  })
}