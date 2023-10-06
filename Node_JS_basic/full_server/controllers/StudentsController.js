/*
create a class named StudentsController. Add two static methods:

The first one is getAllStudents:

  - The method accepts request and response as argument
  - It should return a status 200
  - It calls the function readDatabase from the utils file, and display in the page:
    - First line: This is the list of our students
    - And for each field (order by alphabetic order case insensitive),
    a line that displays the number of students in the field, and the
    list of first names (ordered by appearance in the database file)
    with the following format: Number of students in FIELD: 6. List:
    LIST_OF_FIRSTNAMES
  - If the database is not available, it should return a status 500 and
  the error message Cannot load the database

The second one is getAllStudentsByMajor:

  - The method accepts request and response as argument
  - It should return a status 200
  - It uses a parameter that the user can pass to the browser major.
  The major can only be CS or SWE. If the user is passing another
  parameter, the server should return a 500 and the error Major parameter must be CS or SWE
  - It calls the function readDatabase from the utils file, and display
  in the page the list of first names for the students (ordered by appearance
    in the database file) in the specified field List: LIST_OF_FIRSTNAMES_IN_THE_FIELD
  - If the database is not available, it should return a status 500 and the error
  message Cannot load the database

*/

import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(request, response) {
    readDatabase('./database.csv')
      .then((data) => {
        const studentsByFields = data;
        const fields = Object.keys(studentsByFields).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
        const studentsByField = fields.map((field) => `Number of students in ${field}: ${studentsByFields[field].length}. List: ${studentsByFields[field].join(', ')}`);
        response.status(200).send(`This is the list of our students\n${studentsByField.join('\n')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase('./database.csv')
        .then((data) => {
          const studentsByFields = data;
          const studentsByMajor = studentsByFields[major].join(', ');
          response.status(200).send(`List: ${studentsByMajor}`);
        })
        .catch(() => {
          response.status(500).send('Cannot load the database');
        });
    }
  }
}
