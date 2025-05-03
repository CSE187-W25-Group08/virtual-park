import { pool } from '../db'
import { Permit, PermitType} from './schema'
import * as queries from './queries'

export class PermitService {
  public async getPermitByDriver(driverID: string | undefined):Promise<Permit[]> {
    const query = {
      text: queries.driverPermit,
      values: [driverID]
    }
    const {rows} = await pool.query(query)
    return rows.map(result => ({
      id: result.id,
      issueDate: result.issue_date,
      expDate: result.exp_date,
      type: result.type,
    }))
  }
  public async getPermitType():Promise<PermitType[]> {
    const query = {
      text: queries.permitType,
      values: []
    }
    const {rows} = await pool.query(query)
    return rows.map(result => ({
      price: result.data.price,
      type: result.data.type
    }))
  }
}

  // public async getAll() {
  //   const query = {
  //     text: queries.selectAllPermits
  //   }
  //   const {rows} = await pool.query(query)
  //   const permits = await Promise.all(rows.map(async (permit) => {
  //     const data = permit.data
  //     const permitObj: Permit = {
  //       'id': permit.id,
  //       'licenseNumber': data['license_number'],
  //       'issueDate': data['issue_date'],
  //       'expDate': data['exp_date'],
  //       'type': data['type'],
  //       'price': data['price'],
  //     }
  //     return permitObj
  //   }))

  //   return permits
  // }