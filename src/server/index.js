const express = require('express');
const router = require('./router');
const middlewares = require('./middlewares');
const { onExit } = require('helpers');

function initServer({ port }) {
  const app = express();

  app.use(middlewares);
  app.use('/', router);
  
  const server = app.listen(port, () => {
    console.log(`Listening on next port: ${ port }`);
  });

  handleOnExit(server);
}

function handleOnExit(server) {
  onExit(() => {
    server.close(() => {
      console.log('Server shut down');
      process.exit();
    });
  })
}

module.exports = initServer;