// queries.js

const pool = require('./dbConfig.js');

const getDatumBySN = async (pool, sn) => {
    const query = 'SELECT * FROM data WHERE sn = $1';
    const res = await pool.query(query, [sn]);
    return res.rows;
};

const getMostFrequentSN = async (pool) => {
    const query = `
        SELECT sn FROM data GROUP BY sn ORDER BY COUNT(*) DESC LIMIT 5;`;
    const res = await pool.query(query);
    return res.rows;
};

const getkwhBySnAndDate = async (res, sn, date) => {
    console.log("req: " + req);
    const query = `SELECT kwh from data where datum = $1 AND sn = $2 limit 5;`;
    res = await pool.query(query, date, sn);
    return res.rows;
};
const getkwhAndDateTimeBySn = async (res, sn) => {
    const query = `SELECT datum, tid, kwh from data where sn = $1;`;
    res = await pool.query(query, sn);
    return res.rows;
};

const getDataFromSNAndDate = async (res, date, sn) => {
    const query = `SELECT * FROM data WHERE date = $1 AND sn = $2`;
    res = await pool.query(query, [date, sn]);
    return res.rows;
}

module.exports = {
    getDatumBySN,
    getMostFrequentSN,
    getkwhBySnAndDate,
    getDataFromSNAndDate,
    getkwhAndDateTimeBySn
};