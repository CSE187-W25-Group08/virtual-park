INSERT INTO ticket(data, id)
VALUES(
  jsonb_build_object(
    'email', 'molly@books.com',
    'pwhash', crypt('mollymember', gen_salt('bf')),
    'name', 'Molly Member',
    'roles', '["member"]',
    'deleted', false
  ),
  '6a81eb24-6e4c-495d-ad9e-d22c103b3c67'
);