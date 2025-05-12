export interface Permit {
    id: string,
    issueDate: string,
    expDate: string,
    type: string,
    price: number
}

export interface PermitPurchase {
  purchased: (permit: Permit) => void
}