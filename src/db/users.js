const { readDB, writeDB } = require('./utils-db');

const collectionName = 'users';

async function read(dist, id) {
  let usersCollection;
  try {
    usersCollection = await readDB(dist, collectionName);
  } catch (e) {
    console.log('Error to read users', e);
    throw e;
  }

  if (id) {
    return usersCollection.find(user => Number(user.id) === Number(id));
  }
  return usersCollection;
}

async function create(dist, userData) {
  let usersCollection;
  let user;
  try {
    usersCollection = await read(dist);

    user = {
      ...userData,
      id: usersCollection.length + 1,
    };

    usersCollection.push(user);
    await writeDB(dist, collectionName, usersCollection);
  } catch (e) {
    console.log('Error to create user', e);
    throw e;
  }

  return user;
}

async function update(dist, id, userData) {
  let updatedUser;
  try {
    let usersCollection = await read(dist);
    usersCollection = usersCollection.map((user) => {
      if (user.id === id) {
        updatedUser = {
          ...userData,
          id,
        };
        return updatedUser;
      }
      return userData;
    });

    await writeDB(dist, collectionName, usersCollection);
  } catch (e) {
    console.log('Error to update user', e);
    throw e;
  }

  return updatedUser;
}

function users(dist) {
  return {
    read: read.bind(null, dist),
    create: create.bind(null, dist),
    update: update.bind(null, dist),
  };
}


module.exports = users;
