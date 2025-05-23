export const testTicket = {
  id: "a1b2c3d4",
  vehicle: "uuid",
  enforcer: "uuid",
  lot: "uuid",
  paid: false,
  description: "Parked slightly over the white line due to tight spacing.",
  due: "2025-06-15T23:59:59Z",
  issue: "2025-05-10T14:32:00Z",
  violation: "Improper Parking - Line Violation",
  image: "/images/violations/violation123.jpg",
  cost: 45.00,
  appeal: "submitted",
  appealReason: "test appeal reason"
};

export const testEnforcer = {
  name: 'Edna Enforcer',
  enforcementId: 'EEE-1234',
  email: 'edna@enforcement.com',
  hireDate: 'May 1 2025'
}

export const newEnforcer = {
  name: 'Seika Stopper',
  enforcementId: 'TOK-1234',
  email: 'seika@enforcement.com',
  hireDate: 'March 20 2025',
  password: 'seikastopper'
}

export const testEnforcers = [
  testEnforcer,
  {
    name: 'Peter Patrol',
    enforcementId: 'NYC-212',
    email: 'peter@enforcement.com',
    hireDate: 'August 10 2001'
  }
]
