const { uuid } = require('helpers');

class User {
  constructor({ name }) {
    this.id = uuid(5);
    this.name = name;
  }
}

module.exports = User;
