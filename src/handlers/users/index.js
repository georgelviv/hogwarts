const express = require('express');
const validateUserSchema = require('./users-schema.validator.middleware.js');
const handler = require('./users.handler');

const router = (db) => {
  const routes = express.Router();

  routes.use(validateUserSchema);

  routes.get('/', (req, res) => {
    handler(() => {
      return db.users.read().then((users) => {
        return { data: users };
      });
    })(req, res);
  });

  routes.get('/:id', (req, res) => {
    handler((_req) => {
      const userId = _req.params.id;
      return db.users.read(userId)
        .then((user) => {
          let result = {
            error: true,
            statusCode: 404,
            msg: `No user with id: ${userId}`
          };
          if (user) {
            result = { data: user };
          }
          return result;
        });
    })(req, res);
  });

  routes.post('/', (req, res) => {
    handler((_req) => {
      const userData = _req.body;
      return db.users.create(userData)
        .then((user) => {
          let result = {
            error: true,
            msg: 'Something went wrong'
          };
          if (user) {
            result = { data: user };
          }

          return result;
        });
    })(req, res);
  });

  routes.put('/:id', (req, res) => {
    handler((_req) => {
      const userId = _req.params.id;
      const userData = _req.body;

      return db.users.update(userId, userData)
        .then((user) => {
          let result = {
            error: true,
            statusCode: 500,
            msg: `User with id ${userId} not found`
          };
          if (user) {
            result = { data: user };
          }

          return result;
        });
    })(req, res);
  });

  routes.delete('/', (req, res) => {
    handler(() => {
      return db.users.clear()
        .then(() => {
          return {
            msg: 'OK'
          };
        });
    })(req, res);
  });

  routes.delete('/:id', (req, res) => {
    handler((_req) => {
      const userId = _req.params.id;
      return db.users.remove(userId)
        .then((isDeleted) => {
          let result = {
            error: true,
            statusCode: 404,
            msg: `User with id ${userId} not found`
          };

          if (isDeleted) {
            result = { msg: 'OK' };
          }
          return result;
        });
    })(req, res);
  });

  return routes;
};

module.exports = router;
