const express = require('express');
const { onExit } = require('helpers');

const router = require('./router');
const middlewares = require('./middlewares');

function handleOnExit(server) {
  onExit(() => {
    server.close(() => {
      console.log('Server shut down');
      process.exit();
    });
  });
}

function initServer({ port, db }) {
  const app = express();

  app.use(middlewares);
  app.use('/', router(db));

  const server = app.listen(port, () => {
    console.log(`Listening on next port: ${port}`);
  });

  handleOnExit(server);
}

module.exports = {
  initServer,
};
