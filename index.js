const express = require('express')
const http = require('http')
const  pool  = require('./db/dbConfig.js');
const { getDatumBySN, getMostFrequentSN, getkwhBySnAndDate, getDataFromSNAndDate } = require('./db/queries.js');

//const {parseCSV} = require('./data')

//Connect via lan at "<IpV4:8080>"

//parseCSV();

const app = express()

app.use(express.static('public'))

const data = getkwhBySnAndDate(pool, '07/12/2022', '009074');
console.log(data);
console.log("Listening on port 8080:");
const httpServer= http.createServer(app);
httpServer.listen(8080);