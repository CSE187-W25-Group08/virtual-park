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
    'description', 'Huge rubber duckey',
    'due', '2025-05-10T12:00:00Z',
    'issue', '2025-04-25T09:30:00Z',
    'violation', 'expired meter',
    'image', 'https://upload.wikimedia.org/wikipedia/commons/e/e2/World%27s_Largest_Rubber_Duck_-_NAIAS_2022.jpg',
    'cost', 50.04
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
    'description', 'Driver also sucks',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 50.02
  )
);

-- molly ticket
INSERT INTO ticket(id, driver, data)
VALUES (
  '4b14a022-8e94-43a6-b607-2d8269431326',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', 'c72e1459-5b52-41f2-b731-15c7c981e8b0',
    'paid', false,
    'description', 'Molly cant park',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 49.02
  )
);