import { pool } from '../db'
import { Permit, PermitType} from './schema'
import * as queries from './queries'

export class PermitService {
  public async getPermitByDriver(driverID: string | undefined):Promise<Permit[]> {
    const query = {
      text: queries.selectDriverPermits,
      values: [driverID]
    }
    const {rows} = await pool.query(query)
    return rows.map(result => ({
      issueDate: result.issue_date,
      expDate: result.exp_date,
      type: result.type,
      price: result.price
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