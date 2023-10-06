const http = require("http");
const countStudents = require("./3-read_file_async");

const app = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Hello Holberton School!\n");
  } else if (req.url === "/students") {
    res.statusCode = 200;
    res.write("This is the list of our students\n");

    try {
      const data = await countStudents("./database.csv"); // Replace with the actual path to your CSV file
      res.end(data.join("\n"));
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.end("Not Found\n");
  }
});

app.listen(1245);

module.exports = app;
