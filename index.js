const express = require('express')
const http = require('http')
const  pool  = require('.\\backend\\dbConfig.js');
//const {parseCSV} = require('./data')

//Connect via lan at "<IpV4:8080>"

//parseCSV();

const app = express()

app.use(express.static('public'))

const httpServer= http.createServer(app)
httpServer.listen(8080)

const query = "SELECT * FROM data WHERE SN = '009222' AND datum LIKE '07/12/2022%'";
pool.query(query, (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log(res.rows);
    }
});