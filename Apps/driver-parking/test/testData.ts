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
    violation: "Unique Violation",
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
    violation: "Expired meter",
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
    violation: "dab",
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