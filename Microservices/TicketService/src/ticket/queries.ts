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

export const selectTicket =
  `
  SELECT id, driver, data
  FROM ticket WHERE id = $1
  `

export const updatePaidTicket =
  `
  WITH updated AS (
    UPDATE ticket
    SET data = jsonb_set(data, '{paid}', 'true'::jsonb)
    WHERE id = $1 
    RETURNING *
  )
  SELECT id, driver, data FROM UPDATED
  `