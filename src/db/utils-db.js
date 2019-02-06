const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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

async function writeDB(dist, collectionName, collection) {
  let dbFile;
  try {
    const res = await readFile(dist);
    dbFile = JSON.parse(res.toString('utf8'));
    dbFile[collectionName] = collection;

    await writeFile(dist, JSON.stringify(dbFile));
  } catch (e) {
    console.log('Error to write db', e);
    throw e;
  }
}

module.exports = {
  readDB, writeDB,
};
