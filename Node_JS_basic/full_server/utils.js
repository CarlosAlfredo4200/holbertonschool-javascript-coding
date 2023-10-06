const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

async function readDatabase(filePath) {
  try {
    const data = await readFileAsync(filePath, 'utf8');
    const lines = data.split('\n').filter(Boolean);
    const studentData = {};

    lines.forEach((line) => {
      const [firstName, , , field] = line.split(',');

      if (firstName && field) {
        if (!studentData[field]) {
          studentData[field] = [];
        }
        studentData[field].push(firstName);
      }
    });

    return studentData;
  } catch (error) {
    throw new Error('Cannot read the database');
  }
}

module.exports = {
  readDatabase,
};
