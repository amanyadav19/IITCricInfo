"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var pool = new Pool();
module.exports = {
  query: function query(text, params) {
    return pool.query(text, params);
  }
};