const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'vattenfall',
    host: 'localhost',
    database: 'vattenfall',
    password: '6321',
    port: 5432,
  });
  module.exports = pool;