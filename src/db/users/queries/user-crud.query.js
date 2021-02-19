async function findById(userModel, id) {
  let user;
  const idParam = Number(id);
  try {
    user = await userModel.findById(idParam);
  } catch (e) {
    console.log(`Error to find user width id ${id}`, e);
    throw e;
  }

  return user;
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

module.exports = {
  findById,
  create,
  update,
  remove
};
