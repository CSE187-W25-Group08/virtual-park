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

export const testLots = [
  {
    id: 'uuid-1',
    name: 'Lot 162',
    zone: 'Oakes College',
    address: 'Parking Lot 162, Santa Cruz, CA 95064',
    latitude: 36.9901,
    longitude: -122.0656,
    capacity: 50,
    availableSpots: 12,
    isActive: true,
    type: 'Student Parking',
    updated: '2025-05-26T08:00:00Z',
    created: '2024-09-01T00:00:00Z',
  },
  {
    id: 'uuid-2',
    name: 'Lot 208',
    zone: 'East Remote',
    address: 'Parking Lot 208, Santa Cruz, CA 95064',
    latitude: 36.9915,
    longitude: -122.0602,
    capacity: 200,
    availableSpots: 45,
    isActive: true,
    type: 'General Parking',
    updated: '2025-05-20T10:30:00Z',
    created: '2024-10-15T00:00:00Z',
  }
];
