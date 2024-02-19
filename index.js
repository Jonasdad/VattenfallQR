const express = require('express')
const http = require('http')
const  pool  = require('./db/dbConfig.js');
const { getDatumBySN, getMostFrequentSN, getkwhBySnAndDate, getDataFromSNAndDate, getkwhAndDateTimeBySn } = require('./db/queries.js');

const app = express()

app.use(express.static('public'))


app.get('/api/:id', async (req, res) => {
    const data = await getkwhAndDateTimeBySn(pool, [req.params.id])
    res.json(data)
})

console.log("Listening on port 8080:");
const httpServer= http.createServer(app);
httpServer.listen(8080);