/*
create a function named readDatabase that accepts a file path as argument:

  - It should read the database asynchronously
  - It should return a promise
  - When the file is not accessible, it should reject the promise with the error
  - When the file can be read, it should return an object of arrays of the
  firstname of students per fields
*/

const fs = require('fs');

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, students) => {
      if (error) {
        reject(Error('Cannot load the database'));
        return;
      }

      let line = students.split('\n').slice(1); // remove the first line
      line = line.filter((value) => value);

      /* it should return an object of arrays of the firstname of students per fields */

      const studentsByCS = line.filter((student) => student.includes('CS')).map((student) => student.split(',')[0]);
      const studentsBySWE = line.filter((student) => student.includes('SWE')).map((student) => student.split(',')[0]);

      const studentsByFields = {
        CS: studentsByCS,
        SWE: studentsBySWE,
      };

      resolve(studentsByFields);
    });
  });
}

module.exports = readDatabase;
