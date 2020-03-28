const guests = [
  {
    _id: '12',
    name: 'My name',
    state: 'All right'
  },
  {
    _id: '124',
    name: 'My name 2',
    state: 'All right'
  },
  {
    _id: '125',
    name: 'My name 3',
    state: 'All right'
  },
]

export default {
  Query: {
    getGuests: () => guests,
    getGuest: (root, args) => {
      const guest = guests.filter(g => g._id === args.id);

      return guest.pop();
    }
  }
}
