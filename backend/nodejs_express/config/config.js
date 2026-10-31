// backend/nodejs_express/config/config.js
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({ path: envFile });

const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
db.connect(function(err) {
  if (err) throw err;
  console.log(`Base de datos conectada: ${process.env.DB_NAME}`); // Muestra a qué BD se conectó
});
module.exports = db;