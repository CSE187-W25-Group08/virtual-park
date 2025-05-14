import { pool } from '../db'
import { Lot, DBLot, UpdateLotField, UpdateLotData } from './schema';
import * as queries from './queries'

export class LotService {
  //https://chatgpt.com/c/6823efbe-e604-800d-813e-326ffc8c611c for wack update

  private rowToLot = async (rows: DBLot[]) => {
    const lots = await Promise.all(rows.map(async (lot: DBLot) => {
      const data = lot.data;
      const lotObj: Lot = {
        id: lot.id,
        name: data.name,
        zone: data.zone,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        capacity: data.capacity,
        availableSpots: data.availableSpots,
        isActive: data.isActive,
        type: data.type,
        created: data.created,
        updated: data.updated
      };
      return lotObj;
    }));
    return lots;
  }

  public async getAll(): Promise<Lot[]> {
    const query = {
      text: queries.selectAll
    }
    const { rows } = await pool.query(query);
    const lots = await this.rowToLot(rows);
    return lots;
  }

  public async updateId(lotId: string, data: UpdateLotData): Promise<Lot[]> {
    // remove undefined values from data
    const objectToFilter = Object.entries(data)
    const filteredData = objectToFilter.filter(([, value]) => value !== undefined);

    let jsonbSetSql = 'data';
    const values = [lotId];

    // recursively build the jsonb_set function
    filteredData.forEach(([key, value], i) => {
      const paramIndex = i + 2; 
      jsonbSetSql = `jsonb_set(${jsonbSetSql}, '{${key}}', $${paramIndex}::jsonb)`;
      values.push(JSON.stringify(value)); 
    });

    const queryText= 
    `
    UPDATE lot SET data = ${jsonbSetSql} WHERE id = $1 RETURNING id, data
    `

    const query = {
      text: queryText,
      values: values
    }

    const { rows } = await pool.query(query);
    const lots = await this.rowToLot(rows);
    return lots;

  }
}
