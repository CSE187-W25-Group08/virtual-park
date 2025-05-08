export const permitType= `
select * from permitType;
`;

export const selectDriverPermits = `
SELECT 
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

/* reference: https://www.postgresql.org/docs/current/contrib-dblink-function.html 
https://www.geeksforgeeks.org/postgresql-dollar-quoted-string-constants/*/
export const getpermitByVehiclePlateNum = `
select permitInfo.permitID, permitInfo.permitType, permitInfo.issueDate, permitInfo.expDate, permitInfo.isValid
from vehicle v
LEFT JOIN 
  dblink('dbname=permit user=postgres',
    $$select dp.driverID AS driverID, dp.id AS permitID, pt.data->>'type' AS permitType, dp.data->>'issue_date' AS issueDate,
      dp.data->>'exp_date' AS expDate, (dp.data->>'exp_date')::timestamp > NOW() AS isValid
      from driverpermit dp 
      join permittype pt ON dp.permitType = pt.id $$)
      AS permitInfo( driverID UUID, permitID UUID, permitType TEXT,issueDate TEXT, expDate TEXT, isValid BOOLEAN ) 
      ON v.driver = permitInfo.driverID
      where 
      v.data->>'license_plate' = '123BC4A';`;