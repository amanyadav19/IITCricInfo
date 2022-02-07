"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lab3",
  password: "king.12345",
  port: 5432
});
module.exports = {
  query: function query(text, params) {
    return pool.query(text, params);
  }
};