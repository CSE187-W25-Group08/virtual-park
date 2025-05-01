/**
 * Retrieves all permits in the database
 */
export const selectAllPermits = `
SELECT
  id, data
FROM
  permit
`;