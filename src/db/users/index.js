const userSchema = require('./user-schema');

async function read(userModel, id) {
  let usersCollection = [];
  try {
    usersCollection = await userModel.findAll();
  } catch (e) {
    console.log('Error to read users', e);
    throw e;
  }

  if (id) {
    return usersCollection.find((user) => {
      return Number(user.id) === Number(id);
    });
  }

  return usersCollection;
}

async function create(userModel, userData) {
  let user;
  console.log(userData);
  try {
    await userModel.create(userData);
  } catch (e) {
    console.log('Error to create user', e);
    throw e;
  }

  return user;
}

async function update(dist, id, userData) {
  // let updatedUser;
  // try {
  //   usersCollection = await read(dist);

  //   usersCollection = usersCollection.map((user) => {
  //     if (user.id === id) {
  //       updatedUser = new User({ ...user, ...userData });

  //       return updatedUser;
  //     }
  //     return user;
  //   });

  //   if (updatedUser) {
  //     await writeDB(dist, collectionName, usersCollection);
  //   }
  // } catch (e) {
  //   console.log('Error to update user', e);
  //   throw e;
  // }

  // return updatedUser;
}

async function clear(dist) {
  // try {
  //   await writeDB(dist, collectionName, []);
  // } catch (e) {
  //   console.log('Error to clear user collection', e);
  //   throw e;
  // }

  // return true;
}

async function remove(dist, id) {
  // let isDeleted = false;

  // try {
  //   usersCollection = await read(dist);
  //   usersCollection = usersCollection.filter((user) => {
  //     if (user.id === id) {
  //       isDeleted = true;
  //     }
  //     return user.id !== id;
  //   });

  //   if (isDeleted) {
  //     await writeDB(dist, collectionName, usersCollection);
  //   }
  // } catch (e) {
  //   console.log('Error to clear user collection', e);
  //   throw e;
  // }

  // return isDeleted;
}

function users(sequalize) {
  const UserModel = sequalize.define('users', userSchema.sequalize);

  return new Promise((resolve, reject) => {
    UserModel.sync({ force: true })
      .then(() => {
        resolve({
          read: read.bind(null, UserModel),
          create: create.bind(null, UserModel),
          update: update.bind(null, UserModel),
          clear: clear.bind(null, UserModel),
          remove: remove.bind(null, UserModel)
        });
      })
      .catch(reject);
  });
}


module.exports = {
  users,
  userSchema
};
