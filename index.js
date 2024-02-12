const express = require('express')
const http = require('http')
const  pool  = require('.\\backend\\dbConfig.js');
//const {parseCSV} = require('./data')

//Connect via lan at "<IpV4:8080>"

//parseCSV();

const app = express()

app.use(express.static('public'))

const query = "select * from data where sn = '009074' AND datum = '08/12/2022' AND tid LIKE '01:15%';";
pool.query(query, (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log(res.rows);
    }
});
console.log("Listening on port 8080:");
const httpServer= http.createServer(app);
httpServer.listen(8080);