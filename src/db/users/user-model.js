const { uuid } = require('helpers');

class User {
  constructor({
    name,
    gender,
    age,
    id
  }) {
    this.id = id || uuid(5);
    this.name = name;
    this.gender = gender;
    this.age = age;
  }
}

module.exports = User;
