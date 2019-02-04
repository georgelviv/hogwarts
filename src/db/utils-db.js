const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function readDB(dist) {
  let dbFile;
  try {
    const res = await readFile(dist);
    dbFile = JSON.parse(res.toString('utf8'));
  } catch (e) {
    console.log("Error to read db", e);
    throw e;
  }

  return dbFile;
};

async function writeDB(dist, db) {
  try {
    await writeFile(dist, JSON.stringify(db));
  } catch (e) {
    console.log("Error to write db", e);
    throw e;
  }
};

module.exports = {
  readDB, writeDB
}