/**
 * Retrieves all tickets fromd database
 */
export const selectAllTicketsAdmin =
  `
  SELECT id, driver, data
  FROM ticket
  `

export const selectAllTickets =
  `
SELECT id, driver, data
FROM ticket WHERE (driver = $1)
`

export const selectPaidTickets =
  `
  SELECT id, driver, data

  FROM ticket

  WHERE (data->>'paid' = 'true')
  
  AND (driver = $1)
  
  AND (data->>'appeal' = 'null' OR data->>'appeal' = 'rejected');
  `

export const selectUnpaidTickets =
  `
  SELECT id, driver, data

  FROM ticket

  WHERE (data->>'paid' = 'false')
  
  AND (driver = $1)
  
  AND (data->>'appeal' = 'null' OR data->>'appeal' = 'rejected');
  `

export const selectAppealedTickets =
  `
  SELECT id, driver, data

  FROM ticket

  WHERE (data->>'appeal' = 'submitted' OR data->>'appeal' = 'approved')
  
  AND (driver = $1);
  `

export const selectTicket =
  `
  SELECT id, driver, data
  FROM ticket WHERE id = $1
  AND driver = $2;
  `

export const updatePaidTicket =
  `
  WITH updated AS (
    UPDATE ticket
    SET data = jsonb_set(data, '{paid}', $2::jsonb)
    WHERE id = $1 
    RETURNING *
  )
  SELECT id, driver, data FROM UPDATED
  `

export const updateAppealedTicket =
  `
  WITH updated AS (
    UPDATE ticket
    SET data = jsonb_set(
      jsonb_set(data, '{appeal}', $2::jsonb),
      '{appealReason}', $3::jsonb
    )
    WHERE id = $1
    RETURNING *
  )
  SELECT id, driver, data FROM updated
  `

export const unpaidTickets =
  `
  SELECT id, driver, data
  FROM ticket
  WHERE (data->>'paid')::text = 'false'
    AND (
      data->>'appeal' IS NULL
      OR data->>'appeal' != 'approved'
    )
  ORDER BY data->>'due' ASC;
`;

export const getSpeficTicket =
  `
  SELECT id, driver, data FROM ticket
  WHERE (id::text = $1::text);
`


export const issueTicket =
  `
INSERT INTO ticket(driver, data) 
VALUES (
  $1::uuid,
  jsonb_build_object(
    'vehicle', $2::text,
    'enforcer', $3::text,
    'lot', $4::text,
    'paid', $5::boolean,
    'description', $6::text,
    'due', (NOW() + INTERVAL '3 weeks')::text,
    'issue', NOW()::text,
    'violation', $7::text,
    'cost', $8::numeric,
    'image', $9::text,
    'appeal', 'null'
  )
)
RETURNING id, data;
`;

export const respondAppeal =
  `
  WITH updated AS (
    UPDATE ticket
    SET data = jsonb_set(data, '{appeal}', $2::jsonb)
    WHERE id = $1
    RETURNING *
  )
  SELECT id, driver, data FROM UPDATED
  `

export const respondAppealApproved =
  `
  WITH updated AS (
    UPDATE ticket
    SET data = 
    jsonb_set(
      jsonb_set(data, '{appeal}', $2::jsonb),
      '{cost}', '10.00':: jsonb
    )
    WHERE id = $1
    RETURNING *
  )
  SELECT id, driver, data FROM UPDATED
  `

  export const unpaidTicketsPayroll =
  `
    SELECT COUNT(*) AS count

  FROM ticket

  WHERE (data->>'paid' = 'false')
  
  AND (driver = $1)
  
`;