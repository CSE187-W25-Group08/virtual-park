export interface Vehicle {
  color: string,
  driver: string,
  id: string,
  licensePlate: string,
  make: string,
  model: string
}

export interface Driver {
  name: string,
  email: string,
  jwt: string,
  joinDate: string,
}
