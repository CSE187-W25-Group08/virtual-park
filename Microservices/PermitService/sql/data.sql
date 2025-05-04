INSERT INTO permitType (id, data) VALUES (
  'c4bcb5ba-57f6-4d09-85ba-86fc729ce1e4',
  jsonb_build_object(
    'price', 3.14,
    'type', 'Student'
  )
);

INSERT INTO permitType (id, data) VALUES (
  'e3abcf19-4981-4e1f-b5c2-0d2fa8300d7d',
  jsonb_build_object(
    'price', 6.14,
    'type', 'Staff'
  )
);

INSERT INTO permitType (id, data) VALUES (
  'c3b1660f-fdad-4ca1-ade2-6a4d50f11d11',
  jsonb_build_object(
    'price', 10.14,
    'type', 'Disabled'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  '1978402d-6fb5-4515-8bcf-612d99bd9657',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  'c4bcb5ba-57f6-4d09-85ba-86fc729ce1e4',
  jsonb_build_object(
    'issue_date', '2025-03-05T08:00:00.000Z',
    'exp_date', '2025-03-05T09:00:00.000Z'
  )
);