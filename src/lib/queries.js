import { query } from './db';

export default {
  getGuest: async (root, { id }) => {
    try {
      const { rows } = await query('SELECT * FROM guest WHERE id=$1', [id]);
      const [guest] = rows;

      return guest;
    } catch (error) {
      console.log(error);
    }
  },
  getGuests: async () => {
    try {
      const { rows } = await query('SELECT * FROM guest');
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
};
