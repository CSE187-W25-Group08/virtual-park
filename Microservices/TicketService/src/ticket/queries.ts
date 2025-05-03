import { pool } from '../db';
import { Ticket } from './schema';

/**
 * Retrieves all tickets fromd database
 */
export const selectAllTickets =
  `
  SELECT id, driver, data
  FROM ticket
  `

export const selectPaidTickets =
  `
  SELECT id, driver, data

  FROM ticket

  WHERE (data->>'paid')::boolean = $1
  `
