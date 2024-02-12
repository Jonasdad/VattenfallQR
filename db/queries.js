// queries.js

const pool = require('./dbConfig.js');

const getDatumBySN = async (pool, sn) => {
    const query = 'SELECT * FROM data WHERE sn = $1';
    const res = await pool.query(query, [sn]);
    return res.rows;
};

const getMostFrequentSN = async (pool) => {
    const query = `
        SELECT sn 
        FROM data 
        GROUP BY sn 
        ORDER BY COUNT(*) DESC 
        LIMIT 1
    `;
    const res = await pool.query(query);
    return res.rows[0];
};

const getkwhBySnAndDate = async (pool, date, sn) => {
    const query = `SELECT kwh from data where date = $1, and sn = $2;`;
    const res = await pool.query(query, [date, sn]);
    return res.rows[0];
};

const getDataFromSNAndDate = async (pool, date, sn) => {
    const query = `SELECT * FROM data WHERE date = $1 AND sn = $2`;
    const res = await pool.query(query, [date, sn]);
    return res.rows[0];
}

module.exports = {
    getDatumBySN,
    getMostFrequentSN,
    getkwhBySnAndDate,
    getDataFromSNAndDate
};