const fs = require('fs').promises;

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    // Implement logic to parse the CSV and return the data as required.
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = { readDatabase };
