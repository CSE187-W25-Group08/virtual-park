import { pool } from '../db'
import { Lot, DBLot } from './schema';
import * as queries from './queries'

export class LotService {

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

  public async updateId(lotId: string): Promise<Lot> {
    const query = {
      text: queries.updateId,
      values: [lotId]
    }
    const { rows } = await pool.query(query);
    const lots = await this.rowToLot(rows);
    return lots[0];
  }
}
