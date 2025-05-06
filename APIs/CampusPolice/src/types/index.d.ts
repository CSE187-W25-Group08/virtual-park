
/** 
 * Valid email format
 * @pattern ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
 * @example "example@gmail.com"
 */
export type Email = string;

/**
 * @minLength 180
 * @maxLength 240
 * @pattern ^[A-Za-z0-9_-]{2,}(?:\.[A-Za-z0-9_-]{2,}){2}$
 */
export type Midt = string;

/**
 * @pattern ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
 */
export type UUID = string;

export interface SessionUser {
  id: string,
  roles?: string
}

declare global {
  namespace Express {
    export interface Request {
      user?: SessionUser
    }
  }
}