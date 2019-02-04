const { readDB, writeDB } = require('./utils-db');

async function read(dist, id) {
  let users;
  try {
    const res = await readDB(dist);
    users = res.users;
  } catch (e) {
    console.log("Error to read users", e);
    throw e;
  }

  if (id) {
    return users.find((user) => {
      return Number(user.id) === Number(id);
    })
  } else {
    return users;
  }
};

async function create(dist, user) {
  let users
  try {
    users = await read()
    console.log('create', users);
  } catch (e) {
    console.log("Error to create user", e);
    throw e;
  }
};



function users(dist) {
  return {
    read: read.bind(null, dist)
  }
}



module.exports = users;