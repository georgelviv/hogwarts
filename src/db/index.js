// const setupDBFile = require('./setup-db-file');
const { users, userSchema } = require('./users');
const dbConnect = require('./db-connect');

function initDB(dbConfigs) {
  return dbConnect(dbConfigs)
    .then((sequalize) => {
      return users(sequalize);
    })
    .then((usersModel) => {
      return {
        users: usersModel
      };
    });
}

module.exports = {
  initDB,
  userSchema
};
