const userSchema = require('./user-schema');

async function read(userModel, id) {
  let data;
  try {
    data = id
      ? await userModel.findById(id)
      : await userModel.findAll();
  } catch (e) {
    console.log('Error to read users', e);
    throw e;
  }

  return data;
}

async function create(userModel, userData) {
  let user;
  try {
    user = await userModel.create(userData);
  } catch (e) {
    console.log('Error to create user', e);
    throw e;
  }

  return user;
}

async function update(userModel, id, userData) {
  let user;
  try {
    user = await userModel.findById(id);
    if (user) {
      user = await user.update(userData);
    } else {
      throw new Error('user not found');
    }
  } catch (e) {
    console.log('Error to update user', e);
    throw e;
  }

  return user;
}

async function clear(userModel) {
  try {
    await userModel.destroy({
      where: {},
      truncate: true
    });
  } catch (e) {
    console.log('Error to clear user collection', e);
    throw e;
  }

  return true;
}

async function remove(userModel, id) {
  let user;

  try {
    user = await userModel.findById(id);
    if (user) {
      await user.destroy();
    } else {
      throw new Error(`Error to delete user with id: ${id}`);
    }
  } catch (e) {
    console.log('Error to clear user collection', e);
    throw e;
  }

  return true;
}

function users(sequalize) {
  const UserModel = sequalize.define('users', userSchema.sequalize);

  return UserModel.sync({ force: true })
    .then(() => {
      return {
        read: read.bind(null, UserModel),
        create: create.bind(null, UserModel),
        update: update.bind(null, UserModel),
        clear: clear.bind(null, UserModel),
        remove: remove.bind(null, UserModel)
      };
    });
}


module.exports = {
  users,
  userSchema
};
