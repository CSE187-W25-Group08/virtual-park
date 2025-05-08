import { Credentials, User, CheckUser, NewUser, Driver } from '.';
import { pool } from '../db';
import { generateToken } from './authService';

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
          'joindate', $4::text
        ))
        RETURNING id, data->>'name' AS name;`,
    values: [signUpDetails.email, signUpDetails.password, signUpDetails.name, currentTimestamp]
  }
  const { rows } = await pool.query(signUp);
  if (rows.length === 1) {
    return ({ name: rows[0].name, id: rows[0].id });
  }
}

export async function verifyLogin(credentials: Credentials): Promise<User | undefined> {
  const query = {
    text: `
      SELECT data->>'name' AS name, id,
      (crypt($2, data->>'pwhash') = data->>'pwhash') AS valid
      FROM member
      WHERE data->>'email' = $1
      AND (data->>'deleted' IS NULL OR data->>'deleted' != 'true');
    `,
    values: [credentials.email, credentials.password],
  };
  const { rows } = await pool.query(query);
  if (rows.length === 1 && rows[0].valid) {
    return ({ name: rows[0].name, id: rows[0].id });
  } else {
    return undefined;
  }
}

export async function checkAuth(uid: string): Promise<CheckUser | undefined> {
  const query = {
    text: `
      SELECT id, data->>'roles' AS roles
      FROM member
      WHERE id = $1
      AND (member.data->>'deleted' IS NULL OR member.data->>'deleted' != 'true');
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

export async function suspendAccount(email: string): Promise<void> {
  const query = {
    text: `UPDATE member SET data = jsonb_set(data, '{active}', 'false')
      WHERE data->>'email' = $1;`,
    values: [email],
  };
  await pool.query(query);
}
