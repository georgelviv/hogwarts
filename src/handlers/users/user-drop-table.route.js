const express = require('express');
const handler = require('./users.handler');

const usersDropTableRoute = (db) => {
  const routes = express.Router();

  routes.get('/drop-table', (req, res) => {
    handler(() => {
      let result = {
        error: true,
        statusCode: 500,
        msg: 'Error to drop users table'
      };

      return db.users.dropTable()
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

module.exports = usersDropTableRoute;
