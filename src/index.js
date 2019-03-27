require('module-alias/register');

const { initDB } = require('db');
const { initServer } = require('server');

const {
  DB_NAME: dbName,
  DB_PASSWORD: pass,
  DB_USERNAME: user,
  DB_HOST: dbHost,
  SERVER_PORT
} = process.env;

initDB({
  dbName,
  pass,
  user,
  dbHost
})
  .then((db) => {
    return initServer({ db, port: SERVER_PORT });
  })
  .catch(console.log);
