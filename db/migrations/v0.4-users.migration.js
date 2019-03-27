const userModel = require('../../src/db/users/user-schema').sequelize;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable('Users', userModel);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};
