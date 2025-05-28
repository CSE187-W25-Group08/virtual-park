-- Dummy line
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

INSERT INTO driverPermit (driverID, permitType, data) 
SELECT 
  'bea45ed8-aa83-4c49-a201-4625baa0e91a'::uuid,
  id,
  jsonb_build_object(
    'issuedate', '2025-03-05T08:00:00.000Z',
    'expdate', '2025-03-06T08:00:00.000Z'
  )
FROM permitType
WHERE data->>'type' = 'Daily';


INSERT INTO driverPermit (driverID, permitType, data) 
SELECT 
  'bea45ed8-aa83-4c49-a201-4625baa0e91a'::uuid,
  id,
  jsonb_build_object(
    'issuedate', '2025-03-06T08:00:00.000Z',
    'expdate', '2025-03-07T08:00:00.000Z'
  )
FROM permitType
WHERE data->>'type' = 'Daily';

INSERT INTO driverPermit (driverID, permitType, data)
SELECT
  'bea45ed8-aa83-4c49-a201-4625baa0e91a'::uuid,
  id,
  jsonb_build_object(
    'issuedate', '2024-09-21T08:00:00.000Z',
    'expdate', '2025-06-14T08:00:00.000Z'
  )
FROM permitType
WHERE data->>'type' = 'Year';

