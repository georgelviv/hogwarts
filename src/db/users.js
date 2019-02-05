const { readDB, writeDB } = require('./utils-db');

const collectionName = 'users';

async function read(dist, id) {
  let users;
  try {
    users = await readDB(dist, collectionName);
  } catch (e) {
    console.log('Error to read users', e);
    throw e;
  }

  if (id) {
    return users.find(user => Number(user.id) === Number(id));
  }
  return users;
}

async function create(dist, userData) {
  let users;
  let user;
  try {
    users = await read(dist);

    user = {
      ...userData,
      id: users.length + 1,
    };

    users.push(user);
    await writeDB(dist, collectionName, users);
  } catch (e) {
    console.log('Error to create user', e);
    throw e;
  }

  return user;
}

async function update(dist, id, userData) {
  let updatedUser;
  try {
    let users = await read(dist);
    users = users.map((user) => {
      if (user.id === id) {
        updatedUser = {
          ...userData,
          id,
        };
        return updatedUser;
      }
      return userData;
    });

    await writeDB(dist, collectionName, users);
  } catch (e) {
    console.log('Error to update user', e);
    throw e;
  }

  return user;
}

function users(dist) {
  return {
    read: read.bind(null, dist),
    create: create.bind(null, dist),
    update: update.bind(null, dist),
  };
}


module.exports = users;
