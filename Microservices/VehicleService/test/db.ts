/*
#######################################################################
#
# Copyright (C) 2022-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
/*
#######################################################################
#                   DO NOT MODIFY THIS FILE
#######################################################################
*/

import { Pool } from 'pg'
import * as fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()
process.env.POSTGRES_DB = 'vehicle'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  let statement = ''
  for (let line of lines) {
    line = line.trim()
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
