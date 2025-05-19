export interface Permit {
  permitID: string
  permitType: string,
  issueDate: string,
  expDate: string,
  isValid: boolean
}


export interface Ticket {
    id: string,
    vehicle: string,
    enforcer: string,
    lot: string,
    paid: boolean,
    description: string,
    due: string,
    issue: string,
    violation: string,
    image: string,
    cost: number,
    appeal: string,
    appealReason: string
}