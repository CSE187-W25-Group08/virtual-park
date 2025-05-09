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
export const getPermitByVehiclePlateNum = (carPlateNum: string) => `
  SELECT
    dp.id AS permitID,
    pt.data->>'type' AS permitType,
    dp.data->>'issue_date' AS issueDate,
    dp.data->>'exp_date' AS expDate,
    (dp.data->>'exp_date')::timestamp > NOW() AS isValid
  FROM driverpermit dp
  JOIN permittype pt ON dp.permitType = pt.id
  JOIN dblink(
    'dbname=vehicle user=postgres',
    format(
      $$SELECT driver, data->>'license_plate' AS license_plate 
        FROM vehicle 
        WHERE data->>'license_plate' = %L$$,
      '${carPlateNum}'
    )
  ) AS v(driver uuid, license_plate text)
  ON dp.driverID = v.driver;
`;