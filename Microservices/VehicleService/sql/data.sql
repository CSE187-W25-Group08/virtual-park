\c vehicle

INSERT INTO vehicle (id, driver, data) VALUES (
  '93b35c24-3ad2-4ec9-8404-f50d8e357ace',
  '45c90975-92e0-4a51-b5ea-2fe5f8613b54',
  jsonb_build_object(
    'license_plate', '1XXX000',
    'make', 'Jeep',
    'model', 'Trailhawk',
    'color', 'cyan'
  )
);

--molly 2 vehicles
INSERT INTO vehicle (id, driver, data) VALUES (
  '18fa94fc-4783-42df-a904-7ec17efadca5',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '123BC4A',
    'make', 'Toyota',
    'model', 'Corolla',
    'color', 'Silver'
  )
);
INSERT INTO vehicle (id, driver, data) VALUES (
  'a642d881-af5d-46be-a5c8-8fe979979bbd',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '456DE5B',
    'make', 'Honda',
    'model', 'Accord',
    'color', 'Black'
  )
);


-- select permitInfo.permitID, permitInfo.permitType, permitInfo.issueDate, permitInfo.expDate, permitInfo.isValid
-- from vehicle v
-- LEFT JOIN 
--   dblink('dbname=permit user=postgres',
--     $$select dp.driverID AS driverID, dp.id AS permitID, pt.data->>'type' AS permitType, dp.data->>'issue_date' AS issueDate,
--       dp.data->>'exp_date' AS expDate, (dp.data->>'exp_date')::timestamp > NOW() AS isValid
--       from driverpermit dp 
--       join permittype pt ON dp.permitType = pt.id $$)
--       AS permitInfo( driverID UUID, permitID UUID, permitType TEXT,issueDate TEXT, expDate TEXT, isValid BOOLEAN ) 
--       ON v.driver = permitInfo.driverID
--       where 
--       v.data->>'license_plate' = '123BC4A';


