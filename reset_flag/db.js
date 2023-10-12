const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "secret",
    database: "postgres",
    port: 5432,
    host: "localhost"
})

module.exports = { pool };