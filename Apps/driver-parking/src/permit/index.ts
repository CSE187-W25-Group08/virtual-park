export interface Permit {
  id: string,
  issueDate: string,
  expDate: string,
  type: string,
  price: number
}

export interface PermitType {
  id: string,
  type: string,
  price: number,
  purchased?: boolean,
}

export interface PermitPurchase {
  purchased: (permit: Permit) => void
}

export interface PermitIssue {
  permitID: string
  driverID: string
  vehicleID: string
  permitType: string
  issueDate: string
  expDate: string
  isValid: string
  price: string
}