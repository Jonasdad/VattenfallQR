const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const parseCSV = () => {
    fs.createReadStream('./data/220216_213238.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(results);
      });
}

module.exports = {
    parseCSV
}