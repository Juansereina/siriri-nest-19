import { Pool } from 'pg';

const pool = new Pool();

const query = (text, values) => pool.query(text, values);

const insert = async (queryText, values) => {
  const client = await pool.connect();
  let result;
  try {
    await client.query('BEGIN');
    result = await client.query(queryText, values);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

const insertGuest = async ({ name, state, date = new Date() }) => {
  const values = [name, state, date];
  const queryText = 'INSERT INTO guest(name, state, date) VALUES($1, $2, $3) RETURNING *';

  try {
    return await insert(queryText, values);
  } catch (error) {
    console.error(error);
  }
};

export {
  query,
  insertGuest
};
