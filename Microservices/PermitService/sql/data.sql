\connect permit

INSERT INTO permitType (id, data) VALUES (
  '9b968eea-9abe-457c-ae79-1b128074f683',
  jsonb_build_object(
    'price', 5,
    'type', 'Daily'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '8616e7a7-bd6e-45e2-9809-ed22c727a6da',
  jsonb_build_object(
    'price', 27,
    'type', 'Week'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '7acb1a82-c27a-4440-ace7-6d47add695dd',
  jsonb_build_object(
    'price', 90,
    'type', 'Month'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '5ed85022-ec19-4e22-aff8-9a98feddeea9',
  jsonb_build_object(
    'price', 515.95,
    'type', 'Year'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  '1978402d-6fb5-4515-8bcf-612d99bd9657',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '9b968eea-9abe-457c-ae79-1b128074f683',
  jsonb_build_object(
    'issue_date', '2025-03-05T00:00:00.000Z',
    'exp_date', '2025-03-06T00:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  'bd8cccc2-8ae9-4b55-9281-83bb45c5c0a0',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '9b968eea-9abe-457c-ae79-1b128074f683',
  jsonb_build_object(
    'issue_date', '2025-03-10T00:00:00.000Z',
    'exp_date', '2025-03-11T00:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  '6b721f7b-ad12-4180-b219-9e3e3aab7653',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '9b968eea-9abe-457c-ae79-1b128074f683',
  jsonb_build_object(
    'issue_date', '2025-03-15T00:00:00.000Z',
    'exp_date', '2025-03-16T00:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  'df700d63-71a9-4447-918b-14448d2d751f',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '5ed85022-ec19-4e22-aff8-9a98feddeea9',
  jsonb_build_object(
    'issue_date', '2024-09-21T08:00:00.000Z',
    'exp_date', '2025-09-21T08:00:00.000Z'
  )
);

-- jentest2 permit
INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  'ee86f267-9cc0-4767-96f9-f64af8e2fcf3',
  'd8ae74ff-f0c8-4837-8690-d3e9471fe283',
  '5ed85022-ec19-4e22-aff8-9a98feddeea9',
  jsonb_build_object(
    'issue_date', '2024-07-21T08:00:00.000Z',
    'exp_date', '2025-07-21T08:00:00.000Z'
  )
);

/*
SELECT 
  vinfo.license_plate,
  dp.id AS permitID,
  pt.data->>'type' AS permitType,
  dp.data->>'issue_date' AS issueDate,
  dp.data->>'exp_date' AS expDate,
  (dp.data->>'exp_date')::timestamp > NOW() AS isValid
FROM driverpermit dp
JOIN permittype pt ON dp.permitType = pt.id
LEFT JOIN dblink('dbname=vehicle user=postgres',
  $$SELECT id AS driverID, data->>'license_plate' AS license_plate FROM vehicle$$
) 
AS vinfo(driverID UUID, license_plate TEXT)
ON dp.driverID = vinfo.driverID
WHERE vinfo.license_plate = '123BC4A';
*/

-- SELECT dp.id AS "permitID", pt.data->>'type' AS "permitType", dp.data->>'issue_date' AS "issueDate",
-- dp.data->>'exp_date' AS "expDate", (dp.data->>'exp_date')::timestamp > NOW() AS "isValid", v.driver AS "driverID",
-- v.id AS "vehicleID"
-- FROM driverpermit dp
-- JOIN permittype pt ON dp.permitType = pt.id
-- JOIN dblink('dbname=vehicle user=postgres',
-- $$SELECT id, driver::uuid, data->>'license_plate' AS license_plate
-- FROM vehicle
-- WHERE data->>'license_plate' = '123BC4A'$$
-- ) AS v(id uuid, driver uuid, license_plate text)
-- ON dp.driverID = v.driver;