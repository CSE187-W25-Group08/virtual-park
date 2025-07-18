export const paidList = [
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
  }
];

export const unpaidList = [
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
  }
];

export const appealedList = [
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

export const testVehicle = {
  id: "v123",
  licensePlate: "ABC-123",
  make: "Toyota",
  model: "Camry",
  color: "Blue"
}