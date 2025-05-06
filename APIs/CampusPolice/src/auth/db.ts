import { Credentials, User, CheckUser } from '.'
import { pool } from '../db'


export async function verifyLogin(credentials: Credentials): Promise<User | undefined> {
  const query = {
    text: `
      SELECT data->>'name' AS name, id,
      (crypt($2, data->>'pwhash') = data->>'pwhash') AS valid
      FROM police
      WHERE data->>'email' = $1
      AND (data->>'deleted' IS NULL OR data->>'deleted' != 'true')
    `,
    values: [credentials.email, credentials.password],
  }
  const { rows } = await pool.query(query)
  if (rows.length === 1 && rows[0].valid) {
    return ({ name: rows[0].name, id: rows[0].id })
  } else {
    return undefined
  }
}

export async function checkAuth(uid: string): Promise<CheckUser | undefined> {
  const query = {
    text: `
      SELECT id, data->>'roles' AS roles
      FROM police
      WHERE id = $1
      AND (police.data->>'deleted' IS NULL OR police.data->>'deleted' != 'true')
    `,
    values: [uid],
  }
  const { rows } = await pool.query(query)
  if (rows.length === 1) {
    return ({ id: rows[0].id, roles: rows[0].roles })
  } else {
    return undefined
  }
}
