// const setupDBFile = require('./setup-db-file');
const { users, userSchema } = require('./users');
const dbConnect = require('./db-connect');

const RETIRES_DB_CONNECTION = 5;
const RETIRES_TIMEOUT = 5000;

async function initDB(dbConfigs) {
  let sequalize;
  let retries = RETIRES_DB_CONNECTION;

  while (retries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      sequalize = await dbConnect(dbConfigs);
      break;
    } catch (e) {
      console.log('Error to connect to db');
      console.log(`retries lefts: ${retries}`);
      retries -= 1;
      if (retries <= 0) {
        throw e;
      }

      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => {
        setTimeout(res, RETIRES_TIMEOUT);
      });
    }
  }
  
  const usersModel = await users(sequalize);

  return {
    users: usersModel
  };
}

module.exports = {
  initDB,
  userSchema
};
