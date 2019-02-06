const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);


async function readDB(dist, collectionName) {
  let dbFile;
  try {
    const res = await readFile(dist);
    dbFile = JSON.parse(res.toString('utf8'));
  } catch (e) {
    console.log('Error to read db', e);
    throw e;
  }

  return dbFile[collectionName];
}


module.exports = readDB;
