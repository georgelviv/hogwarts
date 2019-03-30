const { sequelize: userModel } = require('../user-schema');

async function userCreateTableQuery(sequelize) {
  const queryInterface = sequelize.getQueryInterface();
  try {
    try {
      await queryInterface.sequelize.query('CREATE EXTENSION pg_trgm;');
    // eslint-disable-next-line no-empty
    } catch (e) {}
    await queryInterface.createTable('Users', userModel);
    await queryInterface.sequelize.query(`
      CREATE INDEX index_name
        ON public."Users" USING gin
        ("firstName" gin_trgm_ops, "lastName" gin_trgm_ops)
        TABLESPACE pg_default;
    `);
  } catch (e) {
    console.log('Error to drop users table', e);
    throw e;
  }

  return true;
}

module.exports = userCreateTableQuery;
