import { pool } from '../db'
import { Vehicle } from './schema'
import * as queries from './queries'

export class VehicleService {
  public async getAll() {
    const query = {
      text: queries.selectAllVehicles
    }
    const {rows} = await pool.query(query)
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
}
