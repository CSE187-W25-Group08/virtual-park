-- Dummy line
DELETE FROM ticket;

INSERT INTO ticket(id, driver, data)
VALUES (
  'cc97d397-6906-44ee-b616-6ee746914474',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'f2169fe8-16ae-4c3c-b4e4-4b9c243b9ce3',
    'enforcer', 'bc83ae1d-1009-410a-bd28-8cb067bd40c3',
    'lot', 'f6d8425d-eccf-474a-bfed-c126eb7d00e2',
    'paid', true,
    'description', 'unpaid',
    'due', '2025-05-10T12:00:00Z',
    'issue', '2025-04-25T09:30:00Z',
    'violation', 'expired meter',
    'image', 'https://static.wikia.nocookie.net/marvel-rivals/images/b/b0/Rocket_Raccoon_Hero_Portrait.png/revision/latest?cb=20240819163711',
    'cost', 50.04,
    'appeal', 'approved'
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
    'paid', false,
    'description', 'parking in a restricted area',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://static.wikia.nocookie.net/marvel-rivals/images/b/b0/Rocket_Raccoon_Hero_Portrait.png/revision/latest?cb=20240819163711',
    'cost', 50.02,
    'appeal', 'rejected'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  'dfde1cb1-3ab7-4e6b-baaa-d408b27ffe4a',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'd9f4c709-34a9-42b5-91a0-dadf51c559ef',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', 'c72e1459-5b52-41f2-b731-15c7c981e8b0',
    'paid', false,
    'description', 'a ticket you might want to appeal',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://static.wikia.nocookie.net/marvel-rivals/images/b/b0/Rocket_Raccoon_Hero_Portrait.png/revision/latest?cb=20240819163711',
    'cost', 50.02,
    'appeal', 'submitted'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  'd1e75d44-301b-4e37-b8ad-59ce914a2ac9',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'd9f4c709-34a9-42b5-91a0-dadf51c559ef',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', 'c72e1459-5b52-41f2-b731-15c7c981e8b0',
    'paid', false,
    'description', 'an unappealed ticket',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://static.wikia.nocookie.net/marvel-rivals/images/b/b0/Rocket_Raccoon_Hero_Portrait.png/revision/latest?cb=20240819163711',
    'cost', 50.02,
    'appeal', 'null'
  )
);
