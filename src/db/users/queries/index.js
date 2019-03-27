const usersCountQuery = require('./users-count.query');
const usersClearQuery = require('./users-clear.query');
const userSeedQuery = require('./user-seed.query');
const {
  readById,
  read,
  create,
  update,
  remove,
} = require('./user-crud.query');

module.exports = {
  count: usersCountQuery,
  clear: usersClearQuery,
  seed: userSeedQuery,
  readById,
  read,
  create,
  update,
  remove
};
