const express = require('express');
const { userHandler } = require('hanlders');
const { getApiMessage } = require('helpers');
const { API_MESSAGES_TYPES } = require('constants');

const router = (db) => {
  const routes = express.Router();

  routes.use('/users', userHandler(db));

  routes.use('*', (req, res) => {
    const response = getApiMessage('Not found', API_MESSAGES_TYPES.error);
    res.status(404).send(response);
  });

  return routes;
};

module.exports = router;
