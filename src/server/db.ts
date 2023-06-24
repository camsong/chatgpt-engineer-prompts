import pg from 'pg';

export const dbPool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  max: 10,
})
