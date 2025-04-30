import {pool} from '../db';

/**
 * Retrieves all tickets fromd database
 */
export async function selectAllTickets(user: string) {
  const select = 
  `
  SELECT
    id, data
  FROM
    ticket
  `
  const query = {
    text: select,
    values: [user],
  };
  const {rows} = await pool.query(query);
  return rows;
}