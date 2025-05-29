export interface Vehicle {
  id: string,
  licensePlate: string,
  driver: string,
  make: string,
  model: string,
  color: string,
  active: boolean
}

export interface UnregisterVeh {
  id: string;
  licensePlate: string;
}