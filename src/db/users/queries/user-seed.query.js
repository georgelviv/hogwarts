const faker = require('faker');

const seedNumber = 10e5;
const timestamp = new Date();

function genFakeUserList(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push({
      name: faker.name.findName(),
      gender: faker.helpers.randomize(['male', 'female']),
      age: Math.floor(Math.random() * 80) + 5,
      createdAt: timestamp,
      updatedAt: timestamp
    });
  }
  return arr;
}

async function userSeedQuery(UserModel, count) {
  const records = genFakeUserList(count);

  try {
    await UserModel.bulkCreate(records);
  } catch (e) {
    console.log('Error to seed user collection', e);
    throw e;
  }

  return true;
}

module.exports = userSeedQuery;
