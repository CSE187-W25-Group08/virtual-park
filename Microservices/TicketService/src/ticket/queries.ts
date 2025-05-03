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
