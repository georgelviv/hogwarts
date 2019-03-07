const express = require('express');
const validateUserSchema = require('./users-schema.validator.middleware.js');
const handler = require('./users.handler');

const router = (db) => {
  const routes = express.Router();

  routes.use(validateUserSchema);

  routes.get('/', (req, res) => {
    const { query: { limit } } = req;
    handler(() => {
      return Promise.all([
        db.users.read({ limit }),
        db.users.count()
      ])
        .then(([users, total]) => {
          return {
            data: users,
            meta: {
              limit: users.length,
              total
            }
          };
        });
    })(req, res);
  });

  routes.get('/:id', (req, res) => {
    handler((_req) => {
      const userId = _req.params.id;
      return db.users.readById(userId)
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

      let result = {
        error: true,
        statusCode: 500,
        msg: `Error to update user with id ${userId}`
      };

      return db.users.update(userId, userData)
        .then((user) => {
          if (user) {
            result = { data: user };
          }

          return result;
        }).catch(() => {
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
      let result = {
        error: true,
        statusCode: 404,
        msg: `User with id ${userId} not found`
      };

      return db.users.remove(userId)
        .then((isDeleted) => {
          if (isDeleted) {
            result = { msg: 'OK' };
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

module.exports = router;
