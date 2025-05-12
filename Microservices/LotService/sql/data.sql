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
    'capacity', 1000,
    'availableSpots', 987,
    'isActive', true,
    'type', 'Top Secret',
    'updated', '2025-05-10T00:00:00Z',
    'created', '2025-01-01T00:00:00Z'
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
    'capacity', 650,
    'availableSpots', 142,
    'isActive', true,
    'type', 'Student Parking',
    'updated', '2025-05-10T08:00:00Z',
    'created', '2024-09-01T00:00:00Z'
  )
);
