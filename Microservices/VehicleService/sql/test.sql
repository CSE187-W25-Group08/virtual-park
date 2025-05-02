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
    'color', 'cyan'
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
    'color', 'Blue'
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
    'color', 'Black'
  )
);
------------------------------------
----- Do not modify this file ------
------------------------------------
