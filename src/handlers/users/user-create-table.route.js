const express = require('express');
const handler = require('./users.handler');

const usersCreateTableRoute = (db) => {
  const routes = express.Router();

  routes.get('/create-table', (req, res) => {
    handler(() => {
      let result = {
        error: true,
        statusCode: 500,
        msg: 'Error to create users table'
      };

      return db.users.createTable()
        .then(() => {
          result = { msg: 'OK' };
          return result;
        })
        .catch(() => {
          return result;
        });
    })(req, res);
  });

  return routes;
};

module.exports = usersCreateTableRoute;
