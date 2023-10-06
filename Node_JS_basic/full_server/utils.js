<<<<<<< HEAD
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
=======
const fs = require("fs");

exports.readDatabase = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      try {
        if (err) reject(Error("Cannot load the database"));
        const studentsInfo = data
          .split("\n")
          .filter((line) => line)
          .slice(1);
        return resolve({
          studentsInfo,
        });
      } catch (err) {
        return reject(Error("Cannot load the database"));
      }
    });
  });
>>>>>>> a3767d216b38c837aebbd628461ca82f96d489b1
