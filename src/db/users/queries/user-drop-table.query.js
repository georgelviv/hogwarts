async function userDropTable(sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  try {
    await queryInterface.dropTable('Users');
  } catch (e) {
    console.log('Error to drop users table', e);
    throw e;
  }

  return true;
}

module.exports = userDropTable;
