const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

const initialDB = {
  users: [{
    id: 100,
    name: 'Igor'
  }]
};

async function initDB (dist) {
  const dir = dirname(dist);
  let isDirCreated;
  let isFileCreated;

  try {
    await access(dir);
    isDirCreated = true;
  } catch (e) {
    isDirCreated = false;
  }

  if (!isDirCreated) {
    try {
      await mkdir(dir, { recursive: true })
    } catch (e) {
      console.log(`Error to created dir ${ dir }`, e);
      throw e;
    }
  }

  try {
    await access(dist);
    isFileCreated = true;
  } catch (e) {
    isFileCreated = false;
  }

  if (!isFileCreated) {
    try {
      await writeFile(dist, JSON.stringify(initialDB));
    } catch (e) {
      console.log(`Error to write DB file ${ dist }`, e);
      throw e;
    }
  }
}

module.exports = initDB;