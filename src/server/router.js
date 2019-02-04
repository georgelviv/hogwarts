const express = require('express');
const { userHandler } = require('hanlders');


const router = (db) => {
  const routes = express.Router();

  routes.use('/users', userHandler(db));

  routes.use('*', (req, res) => {
    res.status(404).send({
      message: 'Not found'
    });
  });

  return routes;
}

module.exports = router;