export interface SessionUser {
  id: string
}

declare global {
  namespace Express {
    export interface Request {
      user?: SessionUser
    }
  }
}
