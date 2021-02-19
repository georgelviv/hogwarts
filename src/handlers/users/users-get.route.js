const express = require('express');
const handler = require('./users.handler');

const usersGetRoute = (db) => {
  const routes = express.Router();

  routes.get('/', (req, res) => {
    const {
      query: {
        limit,
        offset,
        firstName,
        lastName,
        search
      }
    } = req;

    const params = {
      limit,
      offset,
      firstName,
      lastName,
      nameLike: search
    };

    handler(() => {
      return db.users.find(params)
        .then((result) => {
          return {
            data: result.rows,
            meta: {
              total: result.count,
              ...(limit) && { limit },
              ...(offset) && { offset }
            }
          };
        });
    })(req, res);
  });

  return routes;
};

module.exports = usersGetRoute;
