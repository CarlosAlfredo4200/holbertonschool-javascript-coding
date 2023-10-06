const http = require("http");
const countStudents = require("./3-read_file_async");

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.end("Hello Holberton School!\n");
  } else if (req.url === "/students") {
    res.write("This is the list of our students\n");

    try {
      const data = await countStudents(process.argv[2]);
      res.end(`${data.join("\n")}`);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.end("Not Found\n");
  }
});

app.listen(1245);

module.exports = app;