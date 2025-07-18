import { pool } from '../db'
import { Vehicle, RegisterVehicle } from './schema'
import * as queries from './queries'

export class VehicleService {
  public async getAll() {
    const query = {
      text: queries.selectAllVehicles,
    }
    const { rows } = await pool.query(query)
    const vehicles = await Promise.all(rows.map(async (vehicle) => {
      const data = vehicle.data
      const vehicleObj: Vehicle = {
        'id': vehicle.id,
        'driver': vehicle.driver,
        'licensePlate': data['license_plate'],
        'make': data.make,
        'model': data.model,
        'color': data.color,
      }
      return vehicleObj
    }))

    return vehicles
  }
  public async getUserVehicles(userId: string | undefined) {
    const query = {
      text: queries.selectUserVehicles,
      values: [userId]
    }
    const { rows } = await pool.query(query)
    const vehicles = await Promise.all(rows.map(async (vehicle) => {
      const data = vehicle.data
      const vehicleObj: Vehicle = {
        'id': vehicle.id,
        'driver': 'driver who requested',
        'licensePlate': data['license_plate'],
        'make': data.make,
        'model': data.model,
        'color': data.color,
      }
      return vehicleObj
    }))

    return vehicles
  }

  public async registerVehicle(userId: string | undefined, input: RegisterVehicle) {
    const query = {
      text: queries.registerVehicle,
      values: [userId, input.licensePlate, input.make, input.model, input.color]
    }
    const { rows } = await pool.query(query)

    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'driver': rows[0].driver,
      'licensePlate': rows[0].data.license_plate,
      'make': rows[0].data.make,
      'model': rows[0].data.model,
      'color': rows[0].data.color,
  }
  return vehicleObj;
  }
}