const usersCountQuery = require('./users-count.query');
const usersClearQuery = require('./users-clear.query');
const userSeedQuery = require('./user-seed.query');
const userFindQuery = require('./user-find.query');
const userDropTableQuery = require('./user-drop-table.query');
const userCreateTableQuery = require('./user-create-table.query');

const {
  findById,
  create,
  update,
  remove
} = require('./user-crud.query');

module.exports = {
  count: usersCountQuery,
  clear: usersClearQuery,
  seed: userSeedQuery,
  findById,
  find: userFindQuery,
  create,
  update,
  remove,
  dropTable: userDropTableQuery,
  createTable: userCreateTableQuery
};
