export interface Authenticated {
  name?: string,
  accessToken: string
}

export interface NewUser {
  name: string,
  email: string,
  password: string
}

export interface User {
  name: string
}

export interface Credentials {
  email: string,
  password: string
}