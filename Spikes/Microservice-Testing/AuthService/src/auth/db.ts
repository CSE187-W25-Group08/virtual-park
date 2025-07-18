import { Credentials, User, CheckUser, NewUser } from '.';
import { pool } from '../db';

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
  const signUp = {
    text: `
      INSERT INTO member (data) VALUES (jsonb_build_object(
          'email', $1::text,
          'pwhash', crypt($2, gen_salt('bf')),
          'name', $3::text,
          'roles', jsonb_build_array('driver')::text
        ))
        RETURNING id, data->>'name' AS name;`,
    values: [signUpDetails.email, signUpDetails.password, signUpDetails.name]
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