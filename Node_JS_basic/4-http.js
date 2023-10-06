/*
create a small HTTP server using the http module:

- It should be assigned to the variable app and this one must be exported
- HTTP server should listen on port 1245
- Displays Hello Holberton School! in the page body for any endpoint as plain text
*/

const http = require('http'); // import the http module

const app = http.createServer((req, res) => { // create the server
  res.statusCode = 200; // set the status code
  res.setHeader('Content-Type', 'text/plain'); // set the header
  res.end('Hello Holberton School!'); // set the body
});

app.listen(1245); // listen on port 1245

module.exports = app;
