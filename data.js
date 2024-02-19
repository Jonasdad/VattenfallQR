const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const pool = require("./db/dbConfig"); // Postgresql credentials and setup


// Reads CSV files and constructs database with wanted parameters
const parseCSV = async() => {
  dataPath = './data'
  const results = [];
  let i = 0;
  fs.readdir(dataPath, (err, files) =>{
    for (const file of files) {
      const resultsInner = [];
      const filePath = path.join(dataPath, file)
 
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', async (data) => {
          if(data['035346'] == 'LORAV100') return

          const dataArr = [];
          for (let i = 0; data['_'+(i+8)] !== undefined; i++) {
            dataArr.push(data['_'+(i+8)]);
          }
          const row = {
            datum: data['035346'],
            SN: data.SN,
            Type1: data.Type1,
            DATA: dataArr
          }
          resultsInner.push(row)

          // Insert into the database
          if(row.Type1 == 21){ // Only get type1 = 21
            const query = 'INSERT INTO data (datum, tid, sn, type1, wh, volt, ampere) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            try {
               await pool.query(query, [row.datum.split(' ')[0].split("/").reverse().join("-"), row.datum.split(' ')[1], row.SN, row.Type1, data.DATA, row.DATA[0], row.DATA[1]]);
              // console.log('Insert successful');
            } catch (err) {
              console.error('Error executing query', err.stack);
              console.log(filePath)
            }
          }
          
          })
          .on('end', () => {
            results.push(...resultsInner);
          });
    }
  })
}

module.exports = {
  parseCSV
}
parseCSV();