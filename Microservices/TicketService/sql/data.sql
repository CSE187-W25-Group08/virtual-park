DELETE FROM ticket;

INSERT INTO ticket(id, driver, data)
VALUES (
  'cc97d397-6906-44ee-b616-6ee746914474',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'f2169fe8-16ae-4c3c-b4e4-4b9c243b9ce3',
    'enforcer', 'bc83ae1d-1009-410a-bd28-8cb067bd40c3',
    'lot', 'f6d8425d-eccf-474a-bfed-c126eb7d00e2',
    'status', 'unpaid',
    'description', 'unpaid',
    'due', 'unpaid',
    'issue', 'unpaid',
    'violation', 'expired meter',
    'image', 'https://static.wikia.nocookie.net/marvel-rivals/images/b/b0/Rocket_Raccoon_Hero_Portrait.png/revision/latest?cb=20240819163711'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  'a1f3e1b4-7b3e-4fc5-8e25-2de98cf0e9a2',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'd9f4c709-34a9-42b5-91a0-dadf51c559ef',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', 'c72e1459-5b52-41f2-b731-15c7c981e8b0',
    'status', 'unpaid',
    'description', 'parking in a restricted area',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://static.wikia.nocookie.net/marvel-rivals/images/b/b0/Rocket_Raccoon_Hero_Portrait.png/revision/latest?cb=20240819163711'
  )
);
