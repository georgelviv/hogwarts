const Sequelize = require('sequelize');


function dbConnect({
  user, pass, dbHost, dbName
}) {
  const sequelize = new Sequelize(dbName, user, pass, {
    host: dbHost,
    dialect: 'postgres',
    operatorsAliases: false
  });

  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        resolve(sequelize);
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
        reject(err);
      });
  });
}

module.exports = dbConnect;
