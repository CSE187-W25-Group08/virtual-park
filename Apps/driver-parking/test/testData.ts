export const ticketList = [
  {
    id: "t3",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: false,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "Did not pay",
    image: "/images/tickets/t2.jpg",
    cost: 50.02,
    appeal: "null"
  },
  {
    id: "t2",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: true,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "Expired meter",
    image: "/images/tickets/t2.jpg",
    cost: 50.02,
    appeal: "submitted"
  },
  {
    id: "t4",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: true,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "Cannot park",
    image: "/images/tickets/t2.jpg",
    cost: 50.02,
    appeal: "null"
  },
  {
    id: "t5",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: true,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "Expired meter again",
    image: "/images/tickets/t2.jpg",
    cost: 50.02,
    appeal: "rejected"
  },
  {
    id: "t3",
    vehicle: "XYZ5678",
    enforcer: "E456",
    lot: "Lot B",
    paid: false,
    description: "Does not matter",
    due: "2025-04-25T23:59:59Z",
    issue: "2025-04-25T09:00:00Z",
    violation: "dab",
    image: "/images/tickets/t2.jpg",
    cost: 50.02,
    appeal: "approved"
  }
];

export const testTicket = {
  id: "t3",
  vehicle: "XYZ5678",
  enforcer: "E456",
  lot: "Lot B",
  paid: false,
  description: "Does not matter",
  due: "2025-04-25T23:59:59Z",
  issue: "2025-04-25T09:00:00Z",
  violation: "Did not pay",
  image: "/images/tickets/t2.jpg",
  cost: 50.02,
  appeal: "null"
}
export const testTicketUnknownAppeal = {
  id: "t3",
  vehicle: "XYZ5678",
  enforcer: "E456",
  lot: "Lot B",
  paid: false,
  description: "Does not matter",
  due: "2025-04-25T23:59:59Z",
  issue: "2025-04-25T09:00:00Z",
  violation: "Did not pay",
  image: "/images/tickets/t2.jpg",
  cost: 50.02,
  appeal: "dragon",
  appealReason: "That\'s not me"
}

export const testTicketAppealed = {
  id: "t3",
  vehicle: "XYZ5678",
  enforcer: "E456",
  lot: "Lot B",
  paid: false,
  description: "Does not matter",
  due: "2025-04-25T23:59:59Z",
  issue: "2025-04-25T09:00:00Z",
  violation: "Did not pay",
  image: "/images/tickets/t2.jpg",
  cost: 50.02,
  appeal: "submitted",
  appealReason: "That\'s not me"
}
export const testTicketRejected = {
  id: "t3",
  vehicle: "XYZ5678",
  enforcer: "E456",
  lot: "Lot B",
  paid: false,
  description: "Does not matter",
  due: "2025-04-25T23:59:59Z",
  issue: "2025-04-25T09:00:00Z",
  violation: "Did not pay",
  image: "/images/tickets/t2.jpg",
  cost: 50.02,
  appeal: "rejected",
  appealReason: "That\'s not me"
}
export const testTicketApproved = {
  id: "t3",
  vehicle: "XYZ5678",
  enforcer: "E456",
  lot: "Lot B",
  paid: false,
  description: "Does not matter",
  due: "2025-04-25T23:59:59Z",
  issue: "2025-04-25T09:00:00Z",
  violation: "Did not pay",
  image: "/images/tickets/t2.jpg",
  cost: 50.02,
  appeal: "approved",
  appealReason: "That\'s not me"
}

export const testVehicle = {
  id: "v123",
  licensePlate: "ABC-123",
  make: "Toyota",
  model: "Camry",
  color: "Blue",
  vehicleType: 'Car'
}

export const testVehicle2 = {
  id: 'v1',
  licensePlate: 'ABC123',
  driver: 'testDriver',
  make: 'Nissan',
  model: 'Leaf',
  color: 'Green',
  vehicleType: 'Car',
  active: true
}

export const testMotorcycle = {
  id: 'm1',
  licensePlate: 'ABC123',
  driver: 'testDriver',
  make: 'Yamaha',
  model: 'MT-07',
  color: 'Green',
  vehicleType: 'Motorcycle',
  active: true
}

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
    validPermits: ["Staff", "Visitor", "Motorcycle"],
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
    type: 'General Parking',
    updated: '2025-05-20T10:30:00Z',
    created: '2024-10-15T00:00:00Z',
    validPermits: ["Staff", "Visitor"],
  }
];