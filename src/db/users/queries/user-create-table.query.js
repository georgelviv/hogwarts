const { sequelize: userModel } = require('../user-schema');

async function userCreateTableQuery(sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  try {
    await queryInterface.createTable('Users', userModel);
  } catch (e) {
    console.log('Error to drop users table', e);
    throw e;
  }

  return true;
}

module.exports = userCreateTableQuery;
