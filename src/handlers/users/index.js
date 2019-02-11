const express = require('express');
const { getApiMessage } = require('helpers');
const { API_MESSAGES_TYPES } = require('constants');

const handleError = (res, statusCode, msg) => {
  const response = getApiMessage(msg, API_MESSAGES_TYPES.error);
  res.status(statusCode).json(response);
};

const handleData = (res, data) => {
  const response = getApiMessage(data, API_MESSAGES_TYPES.data);
  res.send(response);
};

const handleEmptyData = (res, msg) => {
  const response = getApiMessage(msg, API_MESSAGES_TYPES.info);
  res.send(response);
};

const router = (db) => {
  const routes = express.Router();

  routes.get('/', (_, res) => {
    db.users.read()
      .then((users) => {
        handleData(res, users);
      });
  });

  routes.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.users.read(userId)
      .then((user) => {
        if (!user) {
          handleError(res, 404, `No user with id: ${userId}`);
        } else {
          handleData(res, user);
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
          handleData(res, user);
        }
      });
  });

  routes.put('/:id', (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    db.users.update(userId, userData)
      .then((user) => {
        if (!user) {
          handleError(res, 500, `User with id ${userId} not found`);
        } else {
          handleData(res, user);
        }
      });
  });

  routes.delete('/', (_, res) => {
    db.users.clear()
      .then(() => {
        handleEmptyData(res, 'OK');
      });
  });

  routes.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.users.remove(userId)
      .then((isDeleted) => {
        if (!isDeleted) {
          handleError(res, 500, `User with id ${userId} not found`);
        } else {
          handleEmptyData(res, 'OK');
        }
      });
  });

  return routes;
};

module.exports = router;
