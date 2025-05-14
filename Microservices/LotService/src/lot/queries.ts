/**
 * Retrieves all tickets fromd database
 */

export const selectAll =
`
SELECT id, data
FROM lot 
`

export const selectById =
`
SELECT id, data
FROM lot  WHERE id = $1
`