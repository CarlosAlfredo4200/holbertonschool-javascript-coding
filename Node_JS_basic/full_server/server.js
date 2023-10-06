/*
create a small Express server:

  - It should use the routes defined in full_server/routes/index.js
  - It should use the port 1245

*/

const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(1245);
