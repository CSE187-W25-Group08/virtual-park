import { pool } from '../db'
import { Vehicle, RegisterVehicle, EditVehicleInput } from './schema'
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
        'vehicleType': data.vehicleType,
        'active': rows[0].data.active
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
        'vehicleType': data.vehicleType,
        'active': data.active
      }
      return vehicleObj
    }))

    return vehicles
  }

  public async registerVehicle(userId: string | undefined, input: RegisterVehicle) {
    const query = {
      text: queries.registerVehicle,
      values: [userId, input.licensePlate, input.make, input.model, input.color, input.vehicleType, input.active]
    }
    const { rows } = await pool.query(query)

    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'driver': rows[0].driver,
      'licensePlate': rows[0].data.license_plate,
      'make': rows[0].data.make,
      'model': rows[0].data.model,
      'color': rows[0].data.color,
      'vehicleType': rows[0].data.vehicleType,
      'active': rows[0].data.active
    }
    return vehicleObj;
  }

    public async UnregisterVehicle(input: string) {
    const query = {
      text: queries.UnregisterVehicle,
      values: [input]
    }
    const { rows } = await pool.query(query)

    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'licensePlate': rows[0].data.license_plate,
    }
    return vehicleObj;
  }

  /* reference: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing
  https://stackoverflow.com/questions/62913315/operator-in-typescript */
  public async getVehicleById(vehicleId: string, userId: string | undefined) {
    const query = {
      text: queries.getVehicleById,
      values: [userId, vehicleId]
    }
    const { rows } = await pool.query(query)

    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'driver': rows[0].driver,
      'licensePlate': rows[0].data.license_plate,
      'make': rows[0].data.make,
      'model': rows[0].data.model,
      'color': rows[0].data.color,
      'vehicleType': rows[0].data.vehicleType,
      'active': rows[0].data.active
    }
    return vehicleObj;
  }

  public async getVehicleByPlate(plate: string) {
    const query = {
      text: queries.getVehicleByPlate,
      values: [plate]
    }
    const { rows } = await pool.query(query)

    if (rows.length === 0) {
      throw new Error(`Vehicle with license plate ${plate} not found`)
    }
    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'driver': rows[0].driver,
      'licensePlate': rows[0].data.license_plate,
      'make': rows[0].data.make,
      'model': rows[0].data.model,
      'color': rows[0].data.color,
      'vehicleType': rows[0].data.vehicleType,
      'active': rows[0].data.active
    }
    return vehicleObj;
  }

  public async getVehicleByIdAdmin(vehicleId: string) {
    const query = {
      text: queries.getVehicleByIdAdmin,
      values: [vehicleId]
    }
    const { rows } = await pool.query(query)

    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'driver': rows[0].driver,
      'licensePlate': rows[0].data.license_plate,
      'make': rows[0].data.make,
      'model': rows[0].data.model,
      'color': rows[0].data.color,
      'vehicleType': rows[0].data.vehicleType,
      'active': rows[0].data.active
    }
    return vehicleObj;
  }
  public async getPrimaryVehicle(userId: string | undefined) {
    const query = {
      text: queries.getPrimaryVehicle,
      values: [userId]
    }
    const { rows } = await pool.query(query)
    if (rows.length <= 0) {
      return null;
    } else {
      const vehicleObj: Vehicle = {
        'id': rows[0].id,
        'driver': rows[0].driver,
        'licensePlate': rows[0].data.license_plate,
        'make': rows[0].data.make,
        'model': rows[0].data.model,
        'color': rows[0].data.color,
        'vehicleType': rows[0].data.vehicleType,
        'active': rows[0].data.active
      }

      return vehicleObj;
    }
  }

  public async updatePrimaryVehicle(userId: string | undefined, vehicleId: string) {
    const query = {
      text: queries.updatePrimaryVehicle,
      values: [userId, vehicleId]
    }
    const { rows } = await pool.query(query)


    const vehicleObj: Vehicle = {
      'id': rows[0].id,
      'driver': rows[0].driver,
      'licensePlate': rows[0].data.license_plate,
      'make': rows[0].data.make,
      'model': rows[0].data.model,
      'color': rows[0].data.color,
      'vehicleType': rows[0].data.vehicleType,
      'active': rows[0].data.active
    }

    return vehicleObj;
  }

  public async editVehicle(userId: string | undefined, input: EditVehicleInput) {
    const query = {
      text: queries.editVehicle,
      values: [userId, input?.id, input?.licensePlate, input?.make, input?.model, input?.color, input?.vehicleType, input?.active]
    }

    const { rows } = await pool.query(query)

    const vehicleObj: Vehicle = {
      id: rows[0].id,
      driver: rows[0].driver,
      licensePlate: rows[0].data.license_plate,
      make: rows[0].data.make,
      model: rows[0].data.model,
      color: rows[0].data.color,
      vehicleType: rows[0].data.vehicleType,
      active: rows[0].data.active
    }

    return vehicleObj;
  }
}