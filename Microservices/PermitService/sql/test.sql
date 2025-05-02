INSERT INTO permitType (id, data) VALUES (
  'c4bcb5ba-57f6-4d09-85ba-86fc729ce1e4',
  jsonb_build_object(
    'price', 3.14,
    'type', 'Slug Student'
  )
);

INSERT INTO driverPermit (id, driver_id, data) VALUES (
  'c4bcb5ba-57f6-4d09-85ba-86fc729ce1e4',
  'driver_id',
  jsonb_build_object(
    'issue_date', '2025-03-05T08:00:00.000Z',
    'exp_date', '2025-03-05T09:00:00.000Z',
  )
);