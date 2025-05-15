import { it, expect, vi} from "vitest";
import { Lot, UpdateLotData } from "../../src/lot";
import { LotService } from "../../src/lot/service";
const newLot: UpdateLotData = {
  name: "Cool Parking",
  zone: "A1",
  address: "123 Main St, Springfield, CA",
  latitude: 37.7749,
  longitude: -122.4194,
  capacity: 100,
  availableSpots: 45,
  isActive: true,
  type: "public",
  created: "2025-05-01T10:00:00Z",
  updated: "2025-05-10T08:30:00Z"
}

const mockLots: Lot[] = [
  {
    id: "lot-001",
    name: "Downtown Parking",
    zone: "A1",
    address: "123 Main St, Springfield, CA",
    latitude: 37.7749,
    longitude: -122.4194,
    capacity: 100,
    availableSpots: 45,
    isActive: true,
    type: "public",
    created: "2025-05-01T10:00:00Z",
    updated: "2025-05-10T08:30:00Z"
  },
  {
    id: "lot-002",
    name: "Uptown Garage",
    zone: "B2",
    address: "456 Elm St, Springfield, CA",
    latitude: 37.7849,
    longitude: -122.4094,
    capacity: 200,
    availableSpots: 120,
    isActive: true,
    type: "private",
    created: "2025-04-15T09:30:00Z",
    updated: "2025-05-08T14:20:00Z"
  },
  {
    id: "lot-003",
    name: "Westside Lot",
    zone: "C3",
    address: "789 Oak St, Springfield, CA",
    latitude: 37.7649,
    longitude: -122.4294,
    capacity: 75,
    availableSpots: 20,
    isActive: false,
    type: "event",
    created: "2025-03-20T12:15:00Z",
    updated: "2025-04-30T11:45:00Z"
  }
];

it("successfully fetches all lots from GraphQL API", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 200,
    json: async () => ({
      data: {
        getAll: mockLots, putId: mockLots[0],
      }
    })
  } as Response);

  const result = await new LotService().getLots();

  expect(result[0].id).toEqual("lot-001");
});

it("Error on mock lots", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 500,
    json: async () => ({
      data: {
        getAll: mockLots, putId: mockLots[0],
      }
    })
  } as Response);

  await expect(new LotService().getLots()).rejects.toThrow('Unauthorized');
});


it("successfully updates lots from GraphQL API", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 200,
    json: async () => ({
      data: {
        getAll: mockLots, putId: mockLots[0],
      }
    })
  } as Response);

  const result = await new LotService().updateLots('lot-001', newLot);
  expect(result.id).toEqual("lot-001");
});

it("Error on mock putLotos for putid", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 500,
    json: async () => ({
      data: {
        getAll: mockLots, putId: mockLots[0],
      }
    })
  } as Response);

  await expect(new LotService().updateLots('lot-001', mockLots[0])).rejects.toThrow('Unauthorized');
});