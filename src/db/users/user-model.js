const { uuid } = require('helpers');

class User {
  constructor({ name, id }) {
    this.id = id || uuid(5);
    this.name = name;
  }
}

module.exports = User;
