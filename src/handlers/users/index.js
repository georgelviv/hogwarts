const express = require('express');

const usersCrudRoute = require('./users-crud.route');
const usersSeedRoute = require('./users-seed.route');

const router = (db) => {
  const routes = express.Router();

  routes.use(usersCrudRoute(db));
  routes.use(usersSeedRoute(db));

  return routes;
};

module.exports = router;
