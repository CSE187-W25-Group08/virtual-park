\connect ticket
DELETE FROM ticket;

INSERT INTO ticket(id, driver, data)
VALUES (
  'cc97d397-6906-44ee-b616-6ee746914474',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'f2169fe8-16ae-4c3c-b4e4-4b9c243b9ce3',
    'enforcer', 'bc83ae1d-1009-410a-bd28-8cb067bd40c3',
    'lot', 'b2c31885-f40b-4a01-9735-904fd5c5a7bd',
    'paid', true,
    'description', 'Huge rubber duckey',
    'due', '2025-05-10T12:00:00Z',
    'issue', '2025-04-25T09:30:00Z',
    'violation', 'expired meter',
    'image', 'https://upload.wikimedia.org/wikipedia/commons/e/e2/World%27s_Largest_Rubber_Duck_-_NAIAS_2022.jpg',
    'cost', 50.04,
    'appeal', 'null'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  'a1f3e1b4-7b3e-4fc5-8e25-2de98cf0e9a2',
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'vehicle', 'a642d881-af5d-46be-a5c8-8fe979979bbd',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Driver also sucks',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 50.02
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  '4b14a022-8e94-43a6-b607-2d8269431326',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
        'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Molly cant park',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 49.02
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  '42498f0c-08d4-48cd-a943-5f08c5be6303',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
        'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Molly cant park again',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'restricted area, testing longer violation name',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 46.12,
    'appeal', 'null'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  '58a43482-2f12-4b38-9b2a-aae693e8c52c',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
        'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Molly cant park again',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'your third ticket (appeal submitted)',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 41.12,
    'appeal', 'submitted',
    'appealReason', 'It was an extreme circumstance'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  '75a3216b-9ce6-4dd8-a52a-60bbb1a1846e',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
        'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Lol Molly',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'Violation but appeal approved',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 39.16,
    'appeal', 'approved'
  )
);

INSERT INTO ticket(id, driver, data)
VALUES (
  'caac0a5a-d6be-440a-ac91-94c617cd34f3',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
        'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Lol Molly',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'Violation but appeal REJECTED',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 24.13,
    'appeal', 'rejected'
  )
);

INSERT INTO ticket(driver, data)
VALUES (
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
        'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Crashed and burned',
    'due', '2025-05-15T12:00:00Z',
    'issue', '2025-04-30T12:00:00Z',
    'violation', 'Invalid permit and property damage',
    'image', 'https://krcrtv.com/resources/media2/16x9/full/1015/center/80/6918a95f-2801-4fa8-b65f-51c46a5395a5-large16x9_crash.jpg',
    'cost', 120.00,
    'appeal', 'submitted'
  )
);

INSERT INTO ticket(driver, data)
VALUES (
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Parked in a faculty-only zone without proper credentials.',
    'due', '2025-06-01T12:00:00Z',
    'issue', '2025-05-10T09:30:00Z',
    'violation', 'Unauthorized Zone Parking',
    'image', 'https://i.pinimg.com/736x/94/9e/84/949e84cb203e27b0a5ec7cb25755f028.jpg',
    'cost', 45.00,
    'appeal', 'submitted',
    'appealReason', 'I parked there temporarily due to a medical emergency and notified campus security.'
  )
);

INSERT INTO ticket(driver, data)
VALUES (
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Exceeded maximum parking duration by 15 minutes.',
    'due', '2025-05-20T12:00:00Z',
    'issue', '2025-05-01T14:15:00Z',
    'violation', 'Overtime Parking',
    'image', 'https://www.myparkingsign.com/blog/wp-content/uploads/Bad-parking-2.jpg',
    'cost', 25.00,
    'appeal', 'approved',
    'appealReason', 'The parking meter was malfunctioning and wouldn’t accept payment after the first hour.'
  )
);

INSERT INTO ticket(driver, data)
VALUES (
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'vehicle', '18fa94fc-4783-42df-a904-7ec17efadca5',
    'enforcer', 'a83cbe2a-4a23-4ef6-90fb-38ce7c5a6f94',
    'lot', '196142bb-86d1-43ed-a823-0a6f48c1b525',
    'paid', false,
    'description', 'Blocking a fire lane entrance.',
    'due', '2025-05-25T12:00:00Z',
    'issue', '2025-05-05T11:45:00Z',
    'violation', 'Fire Lane Violation',
    'image', 'https://i.pinimg.com/736x/94/9e/84/949e84cb203e27b0a5ec7cb25755f028.jpg',
    'cost', 75.00,
    'appeal', 'rejected',
    'appealReason', 'I was only parked there for a minute to grab coffee.'
  )
);
