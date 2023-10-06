const fs = require("fs");
const { promisify } = require("util");

// Promisify the fs.readFile method
const readFileAsync = promisify(fs.readFile);

function countStudents(path) {
  return new Promise((resolve, reject) => {
    readFileAsync(path, "utf8")
      .then((data) => {
        // Split the file content into lines
        const lines = data.split("\n").filter(Boolean); // Remove empty lines

        // Initialize counts and lists for each field
        let totalCount = 0;
        const fieldCounts = {};
        const fieldLists = {};

        lines.forEach((line) => {
          const [firstName, lastName, age, field] = line.split(",");

          // Check if the line contains valid data
          if (firstName && lastName && age && field) {
            totalCount++;

            // Update counts and lists for each field
            if (!fieldCounts[field]) {
              fieldCounts[field] = 1;
              fieldLists[field] = [firstName];
            } else {
              fieldCounts[field]++;
              fieldLists[field].push(firstName);
            }
          }
        });

        // Log the counts and lists
        console.log(`Number of students: ${totalCount}`);
        for (const field in fieldCounts) {
          console.log(
            `Number of students in ${field}: ${
              fieldCounts[field]
            }. List: ${fieldLists[field].join(", ")}`
          );
        }

        resolve(); // Resolve the Promise when done
      })
      .catch((err) => {
        reject(new Error("Cannot load the database"));
      });
  });
}

// Example usage:
countStudents("database.csv").catch((error) => {
  console.error(error.message);
});

module.exports = countStudents;
