-- Dummy line
INSERT INTO permitType (data) VALUES (
  jsonb_build_object(
    'price', 3.14,
    'type', 'Student'
  )
);

INSERT INTO permitType (data) VALUES (
  jsonb_build_object(
    'price', 6.14,
    'type', 'Staff'
  )
);

INSERT INTO permitType (data) VALUES (
  jsonb_build_object(
    'price', 10.14,
    'type', 'Disabled'
  )
);

INSERT INTO driverPermit (driverID, permitType, data) 
SELECT 
  'bea45ed8-aa83-4c49-a201-4625baa0e91a'::uuid,
  id,
  jsonb_build_object(
    'issue_date', '2025-03-05T08:00:00.000Z',
    'exp_date', '2025-03-05T09:00:00.000Z'
  )
FROM permitType
WHERE data->>'type' = 'Student';


INSERT INTO driverPermit (driverID, permitType, data) 
SELECT 
  'bea45ed8-aa83-4c49-a201-4625baa0e91a'::uuid,
  id,
  jsonb_build_object(
    'issue_date', '2025-03-06T08:00:00.000Z',
    'exp_date', '2025-03-06T09:00:00.000Z'
  )
FROM permitType
WHERE data->>'type' = 'Staff';


-- SELECT
--   dp.id AS permitID,
--   pt.data->>'type' AS permitType,
--   dp.data->>'issue_date' AS issueDate,
--   dp.data->>'exp_date' AS expDate,
--   (dp.data->>'exp_date')::timestamp > NOW() AS isValid
-- FROM driverpermit dp
-- JOIN permittype pt ON dp.permitType = pt.id
-- LEFT JOIN dblink('dbname=vehicle user=postgres',
--   $$SELECT id AS driverID, data->>'license_plate' AS license_plate FROM vehicle$$
-- ) AS vinfo(driverID uuid, license_plate TEXT)
-- ON dp.driverID = vinfo.driverID
-- WHERE vinfo.license_plate = '123BC4A';

-- SELECT *
-- FROM dblink('dbname=vehicle user=postgres',
--   $$SELECT id, data->>'license_plate' AS license_plate FROM vehicle
--     WHERE data->>'license_plate' = '123BC4A'$$)
-- AS vehicle_test(id UUID, license_plate TEXT);


-- Get the ID from the vehicle database first
-- SELECT driverID FROM dblink('dbname=vehicle user=postgres',
--   $$SELECT driver AS driverID FROM vehicle WHERE data->>'license_plate' = '123BC4A'$$
-- ) AS v("driverID" uuid);

-- -- Then check if this ID exists in the driverpermit table
-- SELECT * FROM driverpermit WHERE driverID = 'bea45ed8-aa83-4c49-a201-4625baa0e91a';

-- SELECT
--   dp.id AS permitID,
--   pt.data->>'type' AS permitType,
--   dp.data->>'issue_date' AS issueDate,
--   dp.data->>'exp_date' AS expDate,
--   (dp.data->>'exp_date')::timestamp > NOW() AS isValid
-- FROM driverpermit dp
-- JOIN permittype pt ON dp.permitType = pt.id
-- JOIN dblink('dbname=vehicle user=postgres',
--   $$SELECT driver, data->>'license_plate' AS license_plate 
--     FROM vehicle 
--     WHERE data->>'license_plate' = '123BC4A'$$
-- ) AS v(driver uuid, license_plate text)
-- ON dp.driverID = v.driver;

-- SELECT
--   dp.id AS "permitID",
--   pt.data->>'type' AS "permitType",
--   dp.data->>'issue_date' AS "issueDate",
--   dp.data->>'exp_date' AS "expDate",
--   (dp.data->>'exp_date')::timestamp > NOW() AS "isValid"
-- FROM driverpermit dp
-- JOIN permittype pt ON dp.permitType = pt.id
-- LEFT JOIN dblink('dbname=vehicle user=postgres',
--   $$SELECT id::text, data->>'license_plate' FROM vehicle$$
-- ) AS v(driverID text, license_plate text)
--   ON dp.driverID::text = v.driverID
-- WHERE v.license_plate = '123BC4A';