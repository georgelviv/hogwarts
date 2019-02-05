const express = require('express');
const { getApiMessage } = require('helpers');

const handleError = (res, statusCode, msg) => {
  const response = getApiMessage(msg);
  res.status(statusCode).json(response);
};

const router = (db) => {
  const routes = express.Router();

  routes.get('/', (_, res) => {
    db.users.read()
      .then((users) => {
        res.send(users);
      });
  });

  routes.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.users.read(userId)
      .then((user) => {
        if (!user) {
          handleError(res, 404, `No user with id: ${userId}`);
        } else {
          res.send(user);
        }
      });
  });

  routes.post('/', (req, res) => {
    const userData = req.body;
    db.users.create(userData)
      .then((user) => {
        if (!user) {
          handleError(res, 500, 'Something went wrong');
        } else {
          res.send(user);
        }
      });
  });

  routes.post('/:id', (req, res) => {
    const userData = req.body;
    db.users.update(userData)
      .then((user) => {
        if (!user) {
          handleError(res, 500, 'Something went wrong');
        } else {
          res.send(user);
        }
      });
  });

  return routes;
};

module.exports = router;
