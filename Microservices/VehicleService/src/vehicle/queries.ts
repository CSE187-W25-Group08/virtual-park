/**
 * Retrieves all vehicles in the database
 */
export const selectAllVehicles = `
SELECT
  id, driver, data
FROM
  vehicle
`;

export const selectUserVehicles = `
SELECT
  id, data
FROM
  vehicle
WHERE 
  driver::text = $1::text
ORDER BY
  (data->>'active')::boolean DESC,
  data->>'license_plate' ASC;
`;

export const registerVehicle = `
INSERT INTO vehicle (driver, data)
VALUES (
  $1::uuid,
  jsonb_build_object(
    'license_plate', $2::text,
    'make', $3::text,
    'model', $4::text,
    'color', $5::text,
    'vehicleType', $6::text,
    'active', $7::bool
  )
)
RETURNING id, driver, data;
`;

export const UnregisterVehicle = `
INSERT INTO vehicle (data)
VALUES (
  jsonb_build_object(
    'license_plate', $1::text
  )
)
RETURNING id, data;
`;

export const getVehicleById = `
SELECT
  id, driver, data
FROM
  vehicle
WHERE
  driver = $1
  AND id = $2;
`;

export const getVehicleByPlate = `
SELECT
  id, driver, data
FROM
  vehicle
WHERE
  data->>'license_plate' = $1;
`;

export const getVehicleByIdAdmin = `
SELECT
  id, driver, data
FROM
  vehicle
WHERE id = $1;
`;


export const getPrimaryVehicle = `
SELECT
  id, driver, data
FROM
  vehicle
WHERE
  driver = $1
  AND data->>'active' = 'true';
`;

export const updatePrimaryVehicle = `
UPDATE
  vehicle
SET
  data = jsonb_set(data, '{active}', 'false')
WHERE
  driver = $1
  AND id != $2
  AND data->>'active' = 'true';
`;

export const editVehicle = `
UPDATE
  vehicle
SET 
  data = jsonb_build_object(
    'license_plate', $3::text,
    'make', $4::text,
    'model', $5::text,
    'color', $6::text,
    'vehicleType', $7::text,
    'active', $8::boolean
)
WHERE driver = $1 AND id = $2
RETURNING id, driver, data;
`;