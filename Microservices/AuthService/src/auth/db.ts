import { Credentials, User, CheckUser, NewUser, Driver, NewEnforcement, Enforcement } from '.';
import { pool } from '../db';
import { generateToken } from './authService';

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const getUser = {
    text: `
      SELECT id, data->>'name' AS name, data->>'email' AS email FROM member
      WHERE data->>'email' = $1::text;`,
    values: [email],
  }
  const { rows } = await pool.query(getUser);
  if (rows.length === 1) {
    return ({ name: rows[0].name, id: rows[0].id, email: rows[0].email });
  }
}
export async function createNewUser(signUpDetails: NewUser): Promise<User | undefined> {
  const emailUniqueCheck = {
    text: `SELECT * FROM member
    WHERE data->>'email' = $1::text;`,
    values: [signUpDetails.email],
  }
  const check = await pool.query(emailUniqueCheck);
  if (check.rows.length > 0) {
    return undefined;
  }
  const currentTimestamp = new Date().toISOString();
  const signUp = {
    text: `
      INSERT INTO member (data) VALUES (jsonb_build_object(
          'email', $1::text,
          'pwhash', crypt($2, gen_salt('bf')),
          'name', $3::text,
          'roles', jsonb_build_array('driver')::text,
          'joindate', $4::text,
          'suspended', 'false'
        ))
        RETURNING id, data->>'name' AS name, data->>'email' AS email;`,
    values: [signUpDetails.email, signUpDetails.password, signUpDetails.name, currentTimestamp]
  }
  const { rows } = await pool.query(signUp);
  if (rows.length === 1) {
    return ({ name: rows[0].name, id: rows[0].id, email: rows[0].email });
  }
}

export async function createNewEnforcementOfficer(details: NewEnforcement): Promise<Enforcement | undefined> {
  const emailUniqueCheck = {
    text: `SELECT * FROM member
    WHERE data->>'email' = $1::text;`,
    values: [details.email],
  }
  const check = await pool.query(emailUniqueCheck);
  if (check.rows.length > 0) {
    return undefined;
  }
  const currentTimestamp = new Date().toISOString();
  const signUp = {
    text: `
      INSERT INTO member (data) VALUES (jsonb_build_object(
          'email', $1::text,
          'pwhash', crypt($2, gen_salt('bf')),
          'name', $3::text,
          'roles', jsonb_build_array('enforcement')::text,
          'suspended', 'false',
          'officer_details', jsonb_build_object(
            'enforcementId', $4::text,
            'hired', $5::text
          )
        ))
        RETURNING
          data->>'name' AS name, data->>'email' AS email, data->'officer_details'->>'enforcementId' AS id, data->'officer_details'->>'hired' AS hired;
      `,
    values: [details.email, details.password, details.name, details.enforcementId, currentTimestamp]
  }
  const { rows } = await pool.query(signUp);
  if (rows.length === 1) {
    console.log(rows)
    return ({ name: rows[0].name, enforcementId: rows[0].id, email: rows[0].email, hireDate: new Date(rows[0].hired).toDateString() });
  }
}

export async function verifyLogin(credentials: Credentials): Promise<User | undefined> {
  try {
    const query = {
      text: `
        SELECT id, data->>'email' AS email, data->>'name' AS name,
        (crypt($2, data->>'pwhash') = data->>'pwhash') AS valid
        FROM member
        WHERE data->>'email' = $1
        AND (data->>'suspended' IS NULL OR data->>'suspended' != 'true');
      `,
      values: [credentials.email, credentials.password],
    };
    const { rows } = await pool.query(query);
    if (rows.length === 1 && rows[0].valid) {
      return ({ name: rows[0].name, id: rows[0].id, email: rows[0].email });
    } else {
      return undefined;
    }
  } catch (err) {
    console.log('auth db err', err)
  }
}

export async function checkAuth(uid: string): Promise<CheckUser | undefined> {
  const query = {
    text: `
      SELECT id, data->>'roles' AS roles
      FROM member
      WHERE id = $1
      AND (member.data->>'suspended' IS NULL OR member.data->>'suspended' != 'true');
    `,
    values: [uid],
  };
  const { rows } = await pool.query(query);
  if (rows.length === 1) {
    return ({ id: rows[0].id, roles: rows[0].roles });
  } else {
    return undefined;
  }
}

export async function fetchDrivers(): Promise<Driver[]> {
  const query = {
    text: `SELECT id, data->>'name' AS name, data->>'email' AS email, data->>'joindate' as joindate
      FROM member
      WHERE data->>'roles'::text = '["driver"]';`
  }
  const { rows } = await pool.query(query);
  return rows.map((row) => ({
    jwt: generateToken(row.id),
    name: row.name,
    email: row.email,
    joinDate: new Date(row.joindate).toDateString()
  }))
}

export async function fetchEnforcement(): Promise<Enforcement[]> {
  const query = {
    text: `
      SELECT
        data->>'name' AS name, data->>'email' AS email, data->'officer_details'->>'hired' AS hired, data->'officer_details'->>'enforcementId' AS id
      FROM
        member
      WHERE
        data->>'roles'::text = '["enforcement"]';
    `
  }
  const { rows } = await pool.query(query)
  return rows.map((row) => {
    return {
      name: row.name,
      email: row.email,
      enforcementId: row.id,
      hireDate: new Date(row.hired).toDateString()
    }
  })
}

export async function suspendAccount(email: string): Promise<void> {
  const query = {
    text: `UPDATE member SET data = jsonb_set(data, '{suspended}', 'true')
      WHERE data->>'email' = $1;`,
    values: [email],
  };
  await pool.query(query);
}

export async function reactivateAccount(email: string): Promise<void> {
  const query = {
    text: `UPDATE member SET data = jsonb_set(data, '{suspended}', 'false')
      WHERE data->>'email' = $1;`,
    values: [email],
  };
  await pool.query(query);
}
