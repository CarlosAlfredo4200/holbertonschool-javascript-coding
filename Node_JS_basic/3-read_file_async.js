/*
Using the database database.csv (provided in project description), create a function countStudents
in the file 3-read_file_async.js

- Create a function named countStudents. It should accept a path in argument
(same as in 2-read_file.js)
- The script should attempt to read the database file asynchronously
- The function should return a Promise
- If the database is not available, it should throw an error with the text Cannot
load the database
- If the database is available, it should log the following message to the console
Number of students: NUMBER_OF_STUDENTS
- It should log the number of students in each field, and the list with the following
format: Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES
- CSV file can contain empty lines (at the end) - and they are not a valid student!
*/

const fs = require('fs');

module.exports = function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, students) => {
      if (error) {
        reject(Error('Cannot load the database'));
        return;
      }

      // const students = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }); // read the file
      let line = students.split('\n').slice(1); // remove the first line
      line = line.filter((value) => value); // remove empty lines

      const studentsByCS = line.filter((student) => student.includes('CS')).map((student) => student.split(',')[0]);
      const studentsBySWE = line.filter((student) => student.includes('SWE')).map((student) => student.split(',')[0]);

      const test = [];
      test.push(`Number of students: ${line.length}`);
      test.push(`Number of students in CS: ${studentsByCS.length}. List: ${studentsByCS.join(', ')}`);
      test.push(`Number of students in SWE: ${studentsBySWE.length}. List: ${studentsBySWE.join(', ')}`);

      console.log(`Number of students: ${line.length}`);
      console.log(`Number of students in CS: ${studentsByCS.length}. List: ${studentsByCS.join(', ')}`);
      console.log(`Number of students in SWE: ${studentsBySWE.length}. List: ${studentsBySWE.join(', ')}`);

      resolve(test);
    });
  });
};
