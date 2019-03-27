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

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', genFakeUserList(seedNumber), {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
