/**
 * Retrieves all vehicles in the database
 */
export const selectAllVehicles = `
SELECT
  id, driver, data
FROM
  vehicle
`;

export const selectUserVehicles = `
SELECT
  id, data
FROM
  vehicle
WHERE driver::text = $1::text;
`;

export const registerVehicle = `
INSERT INTO vehicle (driver, data)
VALUES (
  $1::uuid,
  jsonb_build_object(
    'license_plate', $2::text,
    'make', $3::text,
    'model', $4::text,
    'color', $5::text
  )
)
RETURNING id, driver, data;
`;

export const getVehicleById = `
SELECT
  id, driver, data
FROM
  vehicle
WHERE
  driver = $1
AND id = $2;
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
      v.data->>'license_plate' = $1;
      `;
