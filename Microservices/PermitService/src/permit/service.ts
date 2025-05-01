import { pool } from '../db'
import { Permit } from './schema'
import * as queries from './queries'

export class PermitService {
  public async getAll() {
    const query = {
      text: queries.selectAllPermits
    }
    const {rows} = await pool.query(query)
    const permits = await Promise.all(rows.map(async (permit) => {
      const data = permit.data
      const permitObj: Permit = {
        'id': permit.id,
        'licenseNumber': data['license_number'],
        'issueDate': data['issue_date'],
        'expDate': data['exp_date'],
      }
      return permitObj
    }))

    return permits

  }
}