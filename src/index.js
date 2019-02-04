require('module-alias/register');
require('dotenv').config()

const { initDB } = require('db');
const { initServer } = require('server');
const SERVER_PORT = process.env.SERVER_PORT;
const DATABASE_DIST = process.env.DATABASE_DIST;

initDB(DATABASE_DIST)
  .then((db) => {
    return initServer({ db, port: SERVER_PORT });
  })
  .catch(console.log)


