const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "secret",
    database: "postgres",
    port: 5433,
    host: "localhost"
})

function init_db() {
    return new Promise(async (resolve) => {
        await pool.query(
        `CREATE TABLE IF NOT EXISTS colleges(
            id serial PRIMARY KEY,
            name varchar(50) NOT NULL
        );`
        );
        await pool.query(
        `CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            username varchar(50) NOT NULL,
            email varchar(50) NOT NULL UNIQUE,
            phone varchar(50) NOT NULL UNIQUE,
            method varchar(50) NOT NULL,
            password varchar(100) NOT NULL,
            uid INT NOT NULL
        );`
        );
        await pool.query(
        `CREATE TABLE IF NOT EXISTS toverify(
            id serial PRIMARY KEY,
            username varchar(50) NOT NULL,
            email varchar(50) NOT NULL UNIQUE,
            phone varchar(50) NOT NULL UNIQUE,
            password varchar(100) NOT NULL,
            uid INT NOT NULL
        )`
        )
        resolve()
    });
}

module.exports = { pool, init_db };