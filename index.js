const express = require('express')
const http = require('http')
const {parseCSV} = require('./data')

parseCSV();

const app = express()

app.use(express.static('public'))

const httpServer= http.createServer(app)
httpServer.listen(8080)