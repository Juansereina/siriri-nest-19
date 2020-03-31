import { insertGuest } from './db';

export default {
  createGuest: async (root, { guest }) => {
    try {
      const { rows } = await insertGuest(guest);
      const [userCreated] = rows;

      return userCreated;
    } catch (error) {
      console.error(error);
      return 'Something went wrong :(';
    }
  }
};
