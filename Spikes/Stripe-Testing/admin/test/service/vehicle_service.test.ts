import { it, expect, vi} from "vitest";
import { Vehicle } from "../../src/driver";
import { VehicleService } from "../../src/vehicle/service";

const mockVehicles: Vehicle[] = [
  {
    id: 'veh-001',
    licensePlate: 'ABC123',
    driver: 'driver-001',
    make: 'Toyota',
    model: 'Camry',
    color: 'Blue',
  },
  {
    id: 'veh-002',
    licensePlate: 'XYZ789',
    driver: 'driver-002',
    make: 'Honda',
    model: 'Civic',
    color: 'Red',
  },
  {
    id: 'veh-003',
    licensePlate: 'LMN456',
    driver: 'driver-003',
    make: 'Ford',
    model: 'Focus',
    color: 'White',
  },
];

it("successfully fetches vehicles from GraphQL API", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 200,
    json: async () => ({
      data: {
        userVehicle: mockVehicles
      }
    })
  } as Response);

  const result = await new VehicleService().getUserVehicles("dummy");

  expect(result.length).toEqual(3);
  expect(result[0].id).toEqual("veh-001");
});

it("Unauthorized on retrieving vehicles", async () => {
  vi.spyOn(global, "fetch").mockResolvedValueOnce({
    status: 500,
    json: async () => ({
      data: {
        userVehicle: mockVehicles
      }
    })
  } as Response);

  await expect(new VehicleService().getUserVehicles("dummy")).rejects.toThrow('Unauthorized');
});