require('dotenv').config();

const {
  DB_NAME: database,
  DB_PASSWORD: password,
  DB_USERNAME: username,
  DB_HOST: host
} = process.env;

const dialect = 'postgres';

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect
  },
  test: {
    username,
    password,
    database,
    host,
    dialect
  },
  production: {
    username,
    password,
    database,
    host,
    dialect
  }
};
