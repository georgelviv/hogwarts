const express = require('express');

const usersCrudRoute = require('./users-crud.route');
const usersSeedRoute = require('./users-seed.route');
const usersTotalRoute = require('./users-total.route');
const usersGetRoute = require('./users-get.route');
const usersDropTableRoute = require('./user-drop-table.route');
const usersCreateTableRoute = require('./user-create-table.route');

const router = (db) => {
  const routes = express.Router();
  const routesUtils = express.Router();

  routesUtils.use(usersSeedRoute(db));
  routesUtils.use(usersTotalRoute(db));
  routesUtils.use(usersDropTableRoute(db));
  routesUtils.use(usersCreateTableRoute(db));

  routes.use(usersGetRoute(db));
  routes.use(usersCrudRoute(db));
  routes.use('/utils', routesUtils);


  return routes;
};

module.exports = router;
