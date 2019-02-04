require('module-alias/register');

const Server = require('server');
const { SERVER_PORT } = require('configs');

new Server(SERVER_PORT);
