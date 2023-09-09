const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "secret",
    database: "postgres",
    port: 5432,
    host: "postgres"
})

function init_db() {
    return new Promise(async (resolve) => {
        await pool.query(
        `CREATE TABLE IF NOT EXISTS teams(
            team_id serial PRIMARY KEY,
            captain_id INT,
            teamname varchar(50) NOT NULL UNIQUE,
            secret varchar(100) NOT NULL,
            team_members INT,
            team_scores integer[][]
        )`
        );
        await pool.query(
        `CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            team_id INT,
            username varchar(50) NOT NULL,
            email varchar(50) NOT NULL UNIQUE,
            phone varchar(50) UNIQUE,
            method varchar(50) NOT NULL,
            password varchar(100) NOT NULL,
            uid INT NOT NULL,
            user_scores integer[][],
            CONSTRAINT fk_team
            FOREIGN KEY(team_id) 
            REFERENCES teams(team_id)
            ON DELETE SET NULL
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
        );
        resolve()
    });
}

module.exports = { pool, init_db };