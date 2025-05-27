export const permitType = `
select * from permitType;
`;

export const getSpecificPermitType = `
select * from permitType
where id = $1;
`;

// export const issuePermit = `
//   INSERT INTO driverPermit (driverID, permitType, data)
//   VALUES ($1, $2, $3::jsonb)
//   RETURNING *;
// `;

export const issuePermit = `
  INSERT INTO driverPermit (driverID, permitType, data)
  VALUES (
    $1::uuid,
    $2::uuid,
    jsonb_build_object(
      'vehicleid', $3::text,
      'permittype', $4::text,
      'issuedate', $5::text,
      'expdate', $6::text,
      'isvalid', $7::text,
      'price', $8::text
    )
  )
  RETURNING *;
`;

export const selectDriverPermits = `
SELECT 
    dp.id AS id,
    dp.data->>'issuedate' AS issuedate,
    dp.data->>'expdate' AS expdate,
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
export const getPermitByVehiclePlateNum = (carPlateNum: string) => `
SELECT dp.id AS "permitID", pt.data->>'type' AS "permitType", dp.data->>'issuedate' AS "issueDate",
dp.data->>'expdate' AS "expDate", (dp.data->>'expdate')::timestamp > NOW() AS "isValid", v.driver AS "driverID",
v.id AS "vehicleID"
FROM driverpermit dp
JOIN permittype pt ON dp.permitType = pt.id
JOIN dblink('dbname=vehicle user=postgres',
$$SELECT id, driver::uuid, data->>'license_plate' AS license_plate
FROM vehicle
WHERE data->>'license_plate' = '${carPlateNum}'$$
) AS v(id uuid, driver uuid, license_plate text)
ON dp.driverID = v.driver;
`;


export const getActivePermit = `
SELECT 
    dp.id AS id,
    dp.data->>'issuedate' AS issuedate,
    dp.data->>'expdate' AS expdate,
    pt.data->>'type' AS type,
    pt.data->>'price' AS price
FROM 
    driverPermit dp
JOIN 
    permitType pt ON dp.permitType = pt.id
WHERE 
    dp.driverID = $1
AND
    (dp.data->>'expdate')::timestamp > NOW()
AND
    (dp.data->>'issuedate')::timestamp <= NOW()
`;