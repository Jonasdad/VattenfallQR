const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: 'vattenfall',
  host: 'localhost',
  database: 'vattenfall',
  password: '6321',
  port: 5432,
});
const parseCSV = async() => {
  dataPath = './data'
  const results = [];
  let i = 0;
  fs.readdir(dataPath, (err, files) =>{
    for (const file of files) {
      const resultsInner = [];
      console.log('Creating DB...');
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
            i++;
            console.log(i);
            const query = 'INSERT INTO data (datum, sn, type1, kwh) VALUES ($1, $2, $3, $4)';
            try {
             await pool.query(query, [row.datum, row.SN, row.Type1, row.DATA]);
              // console.log('Insert successful');
            } catch (err) {
              console.error('Error executing query', err.stack);
              console.log(filePath)
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