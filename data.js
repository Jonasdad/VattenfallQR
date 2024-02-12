const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

const parseCSV = () => {
  dataPath = './data'
  const results = [];
  fs.readdir(dataPath, (err, files) =>{
    for (const file of files) {
      const resultsInner = [];

      const filePath = path.join(dataPath, file)
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => {
          if(data['035346'] == 'LORAV100') return

          const dataArr = [];
          for (let i = 0; data['_'+(i+8)] !== undefined; i++) {
            dataArr.push(data['_'+(i+8)]);
          }
          resultsInner.push({
            DATE: data['035346'],
            SN: data.SN,
            Type1: data.Type1,
            Type2: data.Type2,
            DATA: dataArr
          })
        })
        .on('end', () => {
          results.push(...resultsInner);
        });
    }
    setTimeout(() => {
      console.log(results);
    }, 5000);
  })
}

module.exports = {
    parseCSV
}