require('module-alias/register');
require('dotenv').config();

const { initDB } = require('db');
const { initServer } = require('server');

const { SERVER_PORT, DATABASE_DIST } = process.env;

initDB(DATABASE_DIST)
  .then(db => initServer({ db, port: SERVER_PORT }))
  .catch(console.log);
