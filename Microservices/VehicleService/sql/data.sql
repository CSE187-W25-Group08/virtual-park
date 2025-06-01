\c vehicle

INSERT INTO vehicle (id, driver, data) VALUES (
  '93b35c24-3ad2-4ec9-8404-f50d8e357ace',
  '45c90975-92e0-4a51-b5ea-2fe5f8613b54',
  jsonb_build_object(
    'license_plate', '1XXX000',
    'make', 'Jeep',
    'model', 'Trailhawk',
    'color', 'cyan',
    'vehicleType', 'Car',
    'active', true
  )
);

-- jentest1 vehicle
INSERT INTO vehicle (id, driver, data) VALUES (
  'f94b39b3-fcc3-4f00-a02a-29ffc06a9365',
  'ced418e8-af5c-4a95-9896-374082a80117',
  jsonb_build_object(
    'license_plate', '2XXX111',
    'make', 'Honda',
    'model', 'Pilot',
    'color', 'White',
    'vehicleType', 'Car',
    'active', true
  )
);

-- jentest2 vehicle
INSERT INTO vehicle (id, driver, data) VALUES (
  'a74ab65d-f1ec-48b0-852b-5e9a486fc323',
  'd8ae74ff-f0c8-4837-8690-d3e9471fe283',
  jsonb_build_object(
    'license_plate', '3XXX222',
    'make', 'Honda',
    'model', 'Civic',
    'color', 'Gold',
    'vehicleType', 'Car',
    'active', true
  )
);

-- jentest3 vehicle
INSERT INTO vehicle (id, driver, data) VALUES (
  'ca755b1a-975c-4543-983f-888897db3cab',
  'e38d15bc-5f7d-4f66-9e17-b4827bd8371c',
  jsonb_build_object(
    'license_plate', '4XXX333',
    'make', 'Subaru',
    'model', 'BRZ',
    'color', 'White',
    'vehicleType', 'Car',
    'active', false
  )
);

--molly 3 vehicles
INSERT INTO vehicle (id, driver, data) VALUES (
  '18fa94fc-4783-42df-a904-7ec17efadca5',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '123BC4A',
    'make', 'Toyota',
    'model', 'Corolla',
    'color', 'Silver',
    'vehicleType', 'Car',
    'active', true
  )
);
INSERT INTO vehicle (id, driver, data) VALUES (
  'a642d881-af5d-46be-a5c8-8fe979979bbd',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '456DE5B',
    'make', 'Honda',
    'model', 'Accord',
    'color', 'Black',
    'vehicleType', 'Car',
    'active', false
  )
);
INSERT INTO vehicle (id, driver, data) VALUES (
  '6a15ea88-3b30-405e-a39f-4bb80a1d0080',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '2SAM123',
    'make', 'Tesla',
    'model', 'Model Y',
    'color', 'Red',
    'vehicleType', 'Car',
    'active', false
  )
);

INSERT INTO vehicle (id, driver, data) VALUES (
  '18fa94fc-4783-42df-a904-7ec17efadcb8',
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'license_plate', '7ZJN054',
    'make', 'Toyota',
    'model', 'Corolla',
    'color', 'Silver',
    'vehicleType', 'Car',
    'active', true
  )
);

INSERT INTO vehicle (id, driver, data) VALUES (
  '18fa94fc-4783-42df-a904-7ec17efadcb9',
  'c852b1b6-dc7c-48b2-84f1-fe8aa828a929',
  jsonb_build_object(
    'license_plate', '7ZJN054',
    'make', 'arf',
    'model', 'bark',
    'color', 'bark',
    'vehicleType', 'Motorcycle',
    'active', true
  )
);


INSERT INTO vehicle (id, driver, data) VALUES (
  '18fa94fc-4783-42df-a904-7ec17efadcb1',
  'c852b1b6-dc7c-48b2-84f1-fe8aa828a929',
  jsonb_build_object(
    'license_plate', '1111111',
    'make', 'benz',
    'model', 'amg',
    'color', 'black',
    'vehicleType', 'Motorcycle',
    'active', true
  )
);