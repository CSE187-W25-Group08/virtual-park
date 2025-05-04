/**
 * Retrieves all permits in the database
 */
// export const selectAllPermits = `
// SELECT
//   id, data
// FROM
//   permit
// `;

export const selectDriverPermits = `
SELECT 
    dp.id,
    dp.data->>'issue_date' AS issue_date,
    dp.data->>'exp_date' AS exp_date,
    pt.data->>'type' AS type,
    pt.data->>'price' AS price
FROM 
    driverPermit dp
JOIN 
    permitType pt ON dp.permitType = pt.id
WHERE 
    dp.driverID = $1
`;