import { Pool } from 'pg';

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const db = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM guest');
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
};

export default db;
