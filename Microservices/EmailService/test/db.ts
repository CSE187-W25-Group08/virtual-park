import { Pool } from 'pg'
import * as fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB || 'testdb',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  let statement = ''
  let firstLine = true
  for (let line of lines) {
    line = line.trim()

    if (firstLine) {
      firstLine = false
      continue
    }

    if (!line.startsWith('--')) {
      statement += ' ' + line + '\n'
      if (line.endsWith(';')) {
        await pool.query(statement)
        statement = ''
      }
    }
  }
}

const reset = async () => {
  await run('sql/schema.sql')
  await run('sql/test.sql')
}

const shutdown = () => {
  pool.end()
}

export { reset, shutdown }