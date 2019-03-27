const Sequelize = require('sequelize');


function dbConnect({
  user, pass, dbHost, dbName
}) {
  const sequelize = new Sequelize({
    password: pass,
    username: user,
    database: dbName,
    host: dbHost,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  });

  return sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      return sequelize;
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
      return err;
    });
}

module.exports = dbConnect;
