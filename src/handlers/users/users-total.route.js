const express = require('express');
const handler = require('./users.handler');

const usersTotalRoute = (db) => {
  const routes = express.Router();

  routes.get('/total', (req, res) => {
    handler(() => {
      let result = {
        error: true,
        statusCode: 500,
        msg: 'Error to count users'
      };

      return db.users.count()
        .then((count) => {
          result = { msg: count };
          return result;
        })
        .catch(() => {
          return result;
        });
    })(req, res);
  });

  return routes;
};

module.exports = usersTotalRoute;
