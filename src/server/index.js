const express = require('express');
const router = require('./router');
const middlewares = require('./middlewares');
const { onExit } = require('helpers');

class Server {
  constructor(port) {
    this.port = port;

    this.init();
  }

  init() {
    this.app = express();

    this.app.use(middlewares);
    this.app.use('/', router);

    this.server = this.app.listen(this.port, () => {
      console.log(`Listening on next port: ${ this.port }`);
    });

    onExit(() => {
      this.close();
      process.nextTick(process.exit);
    })
  }

  close(cb = () => {}) {
    this.server.close(() => {
      console.log('Server shut down');
      cb();
    });
  }
}

module.exports = Server;