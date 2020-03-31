import { query } from './db';

export default {
  getGuests: () => [],
  getGuest: async (root, args) => {
    try {
      const { rows } = await query('SELECT * FROM guest');
      const [result] = rows;
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
