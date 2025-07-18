import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB || 'lot',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client (LotService)', err);
});

export { pool }
