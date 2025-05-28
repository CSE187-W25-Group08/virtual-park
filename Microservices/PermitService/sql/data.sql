\connect permit

INSERT INTO permitType (id, data) VALUES (
  '9b968eea-9abe-457c-ae79-1b128074f683',
  jsonb_build_object(
    'price', 5.25,
    'type', 'Daily',
    'class', 'Staff'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '8616e7a7-bd6e-45e2-9809-ed22c727a6da',
  jsonb_build_object(
    'price', 45,
    'type', 'Week',
    'class', 'Staff'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '7acb1a82-c27a-4440-ace7-6d47add695dd',
  jsonb_build_object(
    'price', 150,
    'type', 'Month',
    'class', 'Staff'
  )
);

-- INSERT INTO permitType (id, data) VALUES (
--   '02d241e9-68da-4991-b599-f2c75d86f492',
--   jsonb_build_object(
--     'price', 220.17,
--     'type', 'Quarterly',
--     'class', 'Staff'
--   )
-- );

INSERT INTO permitType (id, data) VALUES (
  '5ed85022-ec19-4e22-aff8-9a98feddeea9',
  jsonb_build_object(
    'price', 765.12,
    'type', 'Year',
    'class', 'Staff'
  )
);

-- INSERT INTO permitType (id, data) VALUES (
--   '1d4f1f9a-fd32-494f-8f44-3339422eeb5f',
--   jsonb_build_object(
--     'price', 515.95,
--     'type', 'Academic Year',
--     'class', 'Student'
--   )
-- );

INSERT INTO permitType (id, data) VALUES (
  '9d62b330-5c1b-4ae6-93ea-95330f719050',
  jsonb_build_object(
    'price', 6,
    'type', 'Daily',
    'class', 'Remote'
  )
);

INSERT INTO permitType (id, data) VALUES (
  'efaf5b3a-8815-45bd-a953-f43610ca5682',
  jsonb_build_object(
    'price', 27,
    'type', 'Week',
    'class', 'Remote'
  )
);

INSERT INTO permitType (id, data) VALUES (
  'bee29c34-fc14-4b37-a97b-1da4e39e7385',
  jsonb_build_object(
    'price', 90,
    'type', 'Month',
    'class', 'Remote'
  )
);

-- INSERT INTO permitType (id, data) VALUES (
--   '7afdd578-b10c-4c5e-b5f2-35e243eaf42a',
--   jsonb_build_object(
--     'price', 140.25,
--     'type', 'Quarterly',
--     'class', 'Remote'
--   )
-- );

-- INSERT INTO permitType (id, data) VALUES (
--   'b97eb6cc-354b-4f0c-b0c3-46d622fa836a',
--   jsonb_build_object(
--     'price', 378.12,
--     'type', 'Academic Year',
--     'class', 'Remote'
--   )
-- );

INSERT INTO permitType (id, data) VALUES (
  '74e74aa3-0743-453f-b48f-6a7819b52326',
  jsonb_build_object(
    'price', 504.96,
    'type', 'Year',
    'class', 'Remote'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '5cd46528-24a3-4212-ad86-8083f065ec0e',
  jsonb_build_object(
    'price', 4,
    'type', 'Daily',
    'class', 'Motorcycle'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '298d838d-4a07-4b45-a918-b83d6af79630',
  jsonb_build_object(
    'price', 18,
    'type', 'Week',
    'class', 'Motorcycle'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '003b2707-7d87-4d10-a226-2489028bce2f',
  jsonb_build_object(
    'price', 40,
    'type', 'Month',
    'class', 'Motorcycle'
  )
);

-- INSERT INTO permitType (id, data) VALUES (
--   '08e30dc9-cb87-45f0-ba45-11ad502ec47a',
--   jsonb_build_object(
--     'price', 84.37,
--     'type', 'Quarterly',
--     'class', 'Motorcycle'
--   )
-- );

-- INSERT INTO permitType (id, data) VALUES (
--   'a81978f9-fd44-4a50-b508-25b8c9107eb5',
--   jsonb_build_object(
--     'price', 168.75,
--     'type', 'Academic Year',
--     'class', 'Motorcycle'
--   )
-- );

INSERT INTO permitType (id, data) VALUES (
  '4e23aa69-899e-4746-b91a-75284b38b517',
  jsonb_build_object(
    'price', 225,
    'type', 'Year',
    'class', 'Motorcycle'
  )
);

INSERT INTO permitType (id, data) VALUES (
  '4f3c6fd7-8ef7-4049-8512-eef66605cdac',
  jsonb_build_object(
    'price', 5,
    'type', 'Daily',
    'class', 'Visitor'
  )
);

-- INSERT INTO permitType (id, data) VALUES (
--   '9c50b4f9-fc75-4a1f-85c2-44b204e6f285',
--   jsonb_build_object(
--     'price', 2.50,
--     'type', 'Hourly',
--     'class', 'Visitor'
--   )
-- );

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  '1978402d-6fb5-4515-8bcf-612d99bd9657',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '4f3c6fd7-8ef7-4049-8512-eef66605cdac',
  jsonb_build_object(
    'issuedate', '2025-03-05T00:00:00.000Z',
    'expdate', '2025-03-06T00:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  'bd8cccc2-8ae9-4b55-9281-83bb45c5c0a0',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '4f3c6fd7-8ef7-4049-8512-eef66605cdac',
  jsonb_build_object(
    'issuedate', '2025-03-10T00:00:00.000Z',
    'expdate', '2025-03-11T00:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  '6b721f7b-ad12-4180-b219-9e3e3aab7653',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '4f3c6fd7-8ef7-4049-8512-eef66605cdac',
  jsonb_build_object(
    'issuedate', '2025-03-15T00:00:00.000Z',
    'expdate', '2025-03-16T00:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  'df700d63-71a9-4447-918b-14448d2d751f',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  '74e74aa3-0743-453f-b48f-6a7819b52326',
  jsonb_build_object(
    'issuedate', '2024-09-21T08:00:00.000Z',
    'expdate', '2025-09-21T08:00:00.000Z'
  )
);

INSERT INTO driverPermit (id, driverID, permitType, data) VALUES (
  'ee86f267-9cc0-4767-96f9-f64af8e2fcf3',
  'd8ae74ff-f0c8-4837-8690-d3e9471fe283',
  '74e74aa3-0743-453f-b48f-6a7819b52326',
  jsonb_build_object(
    'issuedate', '2024-07-21T08:00:00.000Z',
    'expdate', '2025-07-21T08:00:00.000Z'
  )
);
