const userSchema = require('./user-schema');
const {
  readById,
  read,
  create,
  update,
  clear,
  remove,
  count,
  seed
} = require('./queries');

function users(sequelize) {
  const { User } = userSchema;
  User.init(userSchema.sequelize, {
    sequelize,
    indexes: [
        {
          name: 'name_index',
          method: 'BTREE',
          fields: ['name']
        }
      ]
    });

  return User.sync()
    .then(() => {
      return {
        readById: readById.bind(null, User),
        read: read.bind(null, User),
        create: create.bind(null, User),
        update: update.bind(null, User),
        clear: clear.bind(null, User),
        remove: remove.bind(null, User),
        count: count.bind(null, User),
        seed: seed.bind(null, User)
      };
    });
}


module.exports = {
  users,
  userSchema
};
