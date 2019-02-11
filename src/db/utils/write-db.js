const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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

module.exports = writeDB;
