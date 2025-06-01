\connect lot
DELETE FROM lot;


INSERT INTO lot(id, data)
VALUES (
  'b2c31885-f40b-4a01-9735-904fd5c5a7bd',
  jsonb_build_object(
    'name', 'Area 51 Lot',
    'zone', 'Restricted Zone',
    'address', 'Area 51, Nevada, USA',
    'latitude', 37.2431,
    'longitude', -115.7930,
    'capacity', 800,
    'availableSpots', 987,
    'isActive', true,
    'type', 'Top Secret',
    'updated', '2025-05-10T00:00:00Z',
    'created', '2025-01-01T00:00:00Z',
    'validPermits', '["Staff"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '196142bb-86d1-43ed-a823-0a6f48c1b525',
  jsonb_build_object(
    'name', 'Lot 101',
    'zone', 'East Remote',
    'address', 'UC Santa Cruz, Hagar Dr, Santa Cruz, CA 95064',
    'latitude', 36.9914,
    'longitude', -122.0523,
    'capacity', 450,
    'availableSpots', 142,
    'isActive', true,
    'type', 'General Parking',
    'updated', '2025-05-10T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Motorcycle"]'

  )
);

INSERT INTO lot(id, data)
VALUES (
  '9929291f-bdb4-4fd7-887d-8a8de33b0ae1',
  jsonb_build_object(
    'name', 'Lot 127',
    'zone', 'West Remote',
    'address', 'West Remote Parking Lot, Santa Cruz, CA 95064',
    'latitude', 36.9887,
    'longitude', -122.0659,
    'capacity', 150,
    'availableSpots', 20,
    'isActive', true,
    'type', 'General Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle", "Remote"]'

  )
);

INSERT INTO lot(id, data)
VALUES (
  '740b3e9a-d1db-4756-9376-ca16d8f739a1',
  jsonb_build_object(
    'name', 'Lot 104',
    'zone', 'East Remote',
    'address', 'East Remote Parking Lot, Santa Cruz, CA 95064',
    'latitude', 36.9912,
    'longitude', -122.0531,
    'capacity', 300,
    'availableSpots', 75,
    'isActive', true,
    'type', 'General Parking',
    'updated', '2025-05-30T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle", "Remote"]'

  )
);

INSERT INTO lot(id, data)
VALUES (
  '548edd23-df02-4c18-aa4a-b21096e21037',
  jsonb_build_object(
    'name', 'Lot 112',
    'zone', 'Core West',
    'address', 'UCSC Core West Parking Structure, Santa Cruz, CA 95064',
    'latitude', 36.9992,
    'longitude', -122.0637,
    'capacity', 250,
    'availableSpots', 70,
    'isActive', true,
    'type', 'General Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '7b22b846-52c6-46a4-9bd8-cdf27fcd16fc',
  jsonb_build_object(
    'name', 'Lot 103A',
    'zone', 'East Field',
    'address', 'East Field House, Santa Cruz, CA 95064',
    'latitude', 36.9950,
    'longitude', -122.0552,
    'capacity', 50,
    'availableSpots', 4,
    'isActive', true,
    'type', 'General Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '75b5b236-2123-40df-8d32-9771c0afa399',
  jsonb_build_object(
    'name', 'Lot 138',
    'zone', 'Baskin Engineering',
    'address', 'Parking Lot 138, Santa Cruz, CA 95064',
    'latitude', 37.0003,
    'longitude', -122.0639,
    'capacity', 30,
    'availableSpots', 13,
    'isActive', true,
    'type', 'Staff Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '6bbd002f-dce2-4e67-b154-cab7f1d8e4cf',
  jsonb_build_object(
    'name', 'Lot 139A',
    'zone', 'Baskin Engineering',
    'address', 'Parking Lot 139, Santa Cruz, CA 95064',
    'latitude', 37.0017,
    'longitude', -122.0624,
    'capacity', 50,
    'availableSpots', 20,
    'isActive', true,
    'type', 'Staff Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  'c8790680-fc1e-4102-bbe4-76589595fbc4',
  jsonb_build_object(
    'name', 'Lot 126',
    'zone', 'Arts',
    'address', 'Parking Lot 126, Santa Cruz, CA 95064',
    'latitude', 36.9935,
    'longitude', -122.0615,
    'capacity', 100,
    'availableSpots', 40,
    'isActive', true,
    'type', 'General Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '523d504d-ab1f-4509-b677-38398326e531',
  jsonb_build_object(
    'name', 'Lot 107',
    'zone', 'Cowell College',
    'address', 'Parking Lot 107, Santa Cruz, CA 95064',
    'latitude', 36.9935,
    'longitude', -122.0615,
    'capacity', 30,
    'availableSpots', 7,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  'ba1e880d-6af9-4631-af67-dc01f71e4e17',
  jsonb_build_object(
    'name', 'Lot 109',
    'zone', 'Stevenson College',
    'address', 'Parking Lot 109, Santa Cruz, CA 95064',
    'latitude', 36.9983,
    'longitude', -122.0527,
    'capacity', 30,
    'availableSpots', 25,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  'ee3edd08-b616-4276-a29c-efa602fb3ca4',
  jsonb_build_object(
    'name', 'Lot 119',
    'zone', 'Merrill College',
    'address', 'Parking Lot 119, Santa Cruz, CA 95064',
    'latitude', 36.9998,
    'longitude', -122.0517,
    'capacity', 40,
    'availableSpots', 27,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '30b1ea15-ed65-4f82-8fc7-de31f07c7312',
  jsonb_build_object(
    'name', 'Lot 111A',
    'zone', 'Crown College',
    'address', 'Parking Lot 111, Santa Cruz, CA 95064',
    'latitude', 37.0012,
    'longitude', -122.0543,
    'capacity', 30,
    'availableSpots', 18,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  'ed31a09c-8827-4381-8833-757e57fa5b6d',
  jsonb_build_object(
    'name', 'Lot 114',
    'zone', 'John R. Lewis College',
    'address', 'Parking Lot 114, Santa Cruz, CA 95064',
    'latitude', 37.0002,
    'longitude', -122.0589,
    'capacity', 15,
    'availableSpots', 2,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  'e21dced9-3a4e-46e8-9b7e-e3b9fc91cd9b',
  jsonb_build_object(
    'name', 'Lot 166',
    'zone', 'College Nine',
    'address', 'Parking Lot 166, Santa Cruz, CA 95064',
    'latitude', 37.0019,
    'longitude', -122.0578,
    'capacity', 15,
    'availableSpots', 4,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '9d6a6b1a-a8cf-4f94-9c4c-f1b303647ba4',
  jsonb_build_object(
    'name', 'Lot 143',
    'zone', 'Kresge College',
    'address', 'Parking Lot 143, Santa Cruz, CA 95064',
    'latitude', 36.9972,
    'longitude', -122.0670,
    'capacity', 20,
    'availableSpots', 19,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '1baf9bf9-4304-4070-bc10-acac4c2bf2d1',
  jsonb_build_object(
    'name', 'Lot 125',
    'zone', 'Porter College',
    'address', 'Parking Lot 125, Santa Cruz, CA 95064',
    'latitude', 36.9939,
    'longitude', -122.0647,
    'capacity', 20,
    'availableSpots', 13,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  '0f8cc324-8a28-43d2-8f11-ec8255121a98',
  jsonb_build_object(
    'name', 'Lot 146',
    'zone', 'Rachel Carson College',
    'address', 'Parking Lot 146, Santa Cruz, CA 95064',
    'latitude', 36.9925,
    'longitude', -122.0644,
    'capacity', 30,
    'availableSpots', 16,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);

INSERT INTO lot(id, data)
VALUES (
  'a49b8a5a-e939-4379-99e4-c60a7d85dc00',
  jsonb_build_object(
    'name', 'Lot 162',
    'zone', 'Oakes College',
    'address', 'Parking Lot 162, Santa Cruz, CA 95064',
    'latitude', 36.9901,
    'longitude', -122.0656,
    'capacity', 50,
    'availableSpots', 12,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-26T08:00:00Z',
    'created', '2024-09-01T00:00:00Z',
    'validPermits', '["Staff", "Visitor", "Student", "Motorcycle"]'
  )
);