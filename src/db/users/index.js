const userSchema = require('./user-schema');
const {
  findById,
  find,
  create,
  update,
  clear,
  remove,
  count,
  seed,
  dropTable,
  createTable
} = require('./queries');

function users(sequelize) {
  const { User } = userSchema;
  User.init(userSchema.sequelize, {
    sequelize,
    indexes: [
      {
        name: 'index_name',
        using: 'gin',
        operator: 'text_pattern_ops',
        fields: ['firstName', 'lastName']
      }
    ]
  });

  return User.sync()
    .then(() => {
      return {
        findById: findById.bind(null, User),
        find: find.bind(null, User),
        create: create.bind(null, User),
        update: update.bind(null, User),
        clear: clear.bind(null, User),
        remove: remove.bind(null, User),
        count: count.bind(null, User),
        seed: seed.bind(null, User),
        dropTable: dropTable.bind(null, sequelize),
        createTable: createTable.bind(null, sequelize) 
      };
    });
}


module.exports = {
  users,
  userSchema
};
