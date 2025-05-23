import { Pool } from 'pg'

console.log("process.env.POSTGRES_DB", process.env.POSTGRES_DB);
console.log("process.env.POSTGRES_USER", process.env.POSTGRES_USER);
console.log("process.env.POSTGRES_PASSWORD", process.env.POSTGRES_PASSWORD);

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

export { pool }
