------------------------------------
----- Do not modify this file ------
------------------------------------
DELETE FROM vehicle;
INSERT INTO vehicle(id, driver, data) 
VALUES (
  '93b35c24-3ad2-4ec9-8404-f50d8e357ace',
  '5bddd015-35df-4906-bcc9-c9fe632409be',
  jsonb_build_object(
    'license_plate', '1XXX000',
    'make', 'Jeep',
    'model', 'Trailhawk',
    'color', 'cyan',
    'active', true
  )
);

-- no active...
INSERT INTO vehicle(id, driver, data) 
VALUES (
  '93b15c24-3ad2-4ec9-8404-f50d8e357ace',
  'f7298bb9-a42a-410d-821e-5ef175d6e924',
  jsonb_build_object(
    'license_plate', '5741',
    'make', 'Make',
    'model', 'Model',
    'color', 'Blue',
    'active', false
  )
);

-- this driver has 2 vehicles: 45c90975-92e0-4a51-b5ea-2fe5f8613b54
INSERT INTO vehicle(id, driver, data) 
VALUES (
  '28e643bf-2104-4d2e-a62c-225a3c5e36a1',
  '45c90975-92e0-4a51-b5ea-2fe5f8613b54',
  jsonb_build_object(
    'license_plate', '123456',
    'make', 'Honda',
    'model', 'Civic',
    'color', 'Blue',
    'active', true
  )
);
INSERT INTO vehicle(id, driver, data) 
VALUES (
  '92266cf2-9500-4107-9e5f-bb88ed638eed',
  '45c90975-92e0-4a51-b5ea-2fe5f8613b54',
  jsonb_build_object(
    'license_plate', '789100',
    'make', 'Chevy',
    'model', 'Tahoe',
    'color', 'Black',
    'active', false
  )
);

INSERT INTO vehicle (id, driver, data) VALUES (
  '18fa94fc-4783-42df-a904-7ec17efadca5',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '123BC4A',
    'make', 'Toyota',
    'model', 'Corolla',
    'color', 'Silver',
    'active', true
  )
);
------------------------------------
----- Do not modify this file ------
------------------------------------

