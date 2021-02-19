const express = require('express');
const handler = require('./users.handler');

const usersSeedRoute = (db) => {
  const routes = express.Router();

  routes.post('/seed', (req, res) => {
    const { query: { count: countQuery } } = req;
    handler(() => {
      let result = {
        error: true,
        statusCode: 500,
        msg: 'Error to bulk create user models'
      };

      const count = countQuery || 10;

      return db.users.seed(count)
        .then((isCreated) => {
          if (isCreated) {
            result = { msg: `${count} users was created.` };
          }
          return result;
        })
        .catch(() => {
          return result;
        });
    })(req, res);
  });

  return routes;
};

module.exports = usersSeedRoute;
