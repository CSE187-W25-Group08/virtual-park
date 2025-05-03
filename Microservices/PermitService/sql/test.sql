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

select * from permitType;

select * from driverpermit
where driverid = 'bea45ed8-aa83-4c49-a201-4625baa0e91a'