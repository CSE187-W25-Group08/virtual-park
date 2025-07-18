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
WHERE driver::text = $1::text;
`;

export const registerVehicle = `
INSERT INTO vehicle (driver, data)
VALUES (
  $1::uuid,
  jsonb_build_object(
    'license_plate', $2::text,
    'make', $3::text,
    'model', $4::text,
    'color', $5::text
  )
)
RETURNING id, driver, data;
`;