export interface Authenticated {
  name: string,
  accessToken: string
}

export interface User {
  name: string
}

export interface Driver {
  name: string,
  email: string,
  id: string
}

export interface Credentials {
  email: string,
  password: string
}