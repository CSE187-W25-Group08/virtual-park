import { pool } from '../db'
import { Permit, PermitType, PermitValid, PermitIssue } from './schema'
import * as queries from './queries'

export class PermitService {
  public async getPermitByDriver(driverID: string | undefined): Promise<Permit[]> {
    const query = {
      text: queries.selectDriverPermits,
      values: [driverID]
    }
    const { rows } = await pool.query(query)
    return rows.map(result => ({
      id: result.id,
      issueDate: result.issuedate,
      expDate: result.expdate,
      type: result.type,
      price: result.price,
      permitClass: result.permitclass
    }))
  }

  public async getPermitType(): Promise<PermitType[]> {
    const query = {
      text: queries.permitType,
      values: []
    }
    const { rows } = await pool.query(query)
    return rows.map(result => ({
      id: result.id,
      price: result.data.price,
      type: result.data.type,
      permitClass: result.data.class
    }))
  }
  public async getSpecificPermitType(permitID: string): Promise<PermitType> {
    const query = {
      text: queries.getSpecificPermitType,
      values: [permitID]
    }
    const { rows } = await pool.query(query)
    const row = rows[0];
    return new PermitType(
      row.id,
      row.data.price,
      row.data.type,
      row.data.class
    );
  }

  public async permitIssue(permitData: {
    driverID: string;
    vehicleID: string;
    permitType: string;
    issueDate: string;
    expDate: string;
    isValid: boolean;
    price: number;
    permitClass: string;
  }): Promise<PermitIssue> {
    console.log("inserting pertmit data in permitservice", permitData)
    const query = {
      text: queries.issuePermit,
      values: [
        permitData.driverID,
        permitData.permitType,
        permitData.vehicleID,
        permitData.permitType,
        permitData.issueDate,
        permitData.expDate,
        permitData.isValid,
        permitData.price,
        permitData.permitClass
      ]
    };

    const { rows } = await pool.query(query);
    const row = rows[0];
    console.log("row that was inserted by permitIssue in permit service", row)
    return new PermitIssue(
      row.driverid,
      row.data.vehicleid,
      row.id,
      row.data.permittype,
      row.data.issuedate,
      row.data.expdate,
      (row.data.isvalid == 'true') ? true : false,
      row.data.permitclass
    );
  }

  // public async permitIssue(permitData: {
  //   driverID: string;
  //   vehicleID: string;
  //   permitType: string; 
  //   issueDate: string;
  //   expDate: string;
  //   isValid: boolean;
  //   price: number;
  // }): Promise<PermitIssue> {
  //   const data = {
  //     vehicleID: permitData.vehicleID,
  //     permitType: permitData.permitType,
  //     issueDate: permitData.issueDate,
  //     expDate: permitData.expDate,
  //     isValid: permitData.isValid,
  //     price: permitData.price,
  //   };

  //   const query = {
  //     text: queries.issuePermit,
  //     values: [
  //       permitData.driverID,
  //       permitData.permitType,
  //       JSON.stringify(data)
  //     ]
  //   };

  //   const {rows} = await pool.query(query);

  //   const row = rows[0];

  //   return new PermitIssue(
  //     row.driverid,
  //     row.data.vehicleID,
  //     row.id,
  //     row.data.permitType,
  //     row.data.issueDate,
  //     row.data.expDate,
  //     row.data.isValid 
  //   );
  // }
  public async getPermitByCar(carPlateNum: string): Promise<PermitValid[]> {
    const query = queries.getPermitByVehiclePlateNum(carPlateNum)
    const { rows } = await pool.query(query)
    return rows.map(result => ({
      driverID: result.driverID,
      vehicleID: result.vehicleID,
      permitID: result.permitID,
      permitType: result.permitType,
      issueDate: result.issueDate,
      expDate: result.expDate,
      isValid: result.isValid,
      permitClass: result.permitClass
    }))
  }

  public async getValidPermit(driverID: string | undefined): Promise<Permit | null> {
    const query = {
      text: queries.getActivePermit,
      values: [driverID]
    }
    const result = await pool.query(query)
    // if (result.rowCount === 0) {
    //   return null
    // }
    return {
      id: result.rows[0].id,
      issueDate: result.rows[0].issuedate,
      expDate: result.rows[0].expdate,
      type: result.rows[0].type,
      price: result.rows[0].price,
      permitClass: result.rows[0].permitclass
    }
  }
}