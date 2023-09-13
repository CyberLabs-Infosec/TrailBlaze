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
            `CREATE TABLE IF NOT EXISTS challenges(
                chall_id SERIAL PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                prompt VARCHAR(100) NOT NULL,
                place INTEGER NOT NULL,
                checkPoint BOOLEAN DEFAULT FALSE,
                flag VARCHAR(50) NOT NULL,
                points INTEGER NOT NULL,
                hints TEXT ARRAY[],
                solves INTEGER DEAFULT 0
            );`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS teams(
                team_id SERIAL PRIMARY KEY,
                teamname VARCHAR(50) NOT NULL UNIQUE,
                secret VARCHAR(100) NOT NULL,
                captain_id INTEGER NOT NULL,
                team_members INTEGER,
                team_scores INTEGER[][],
                last_solved INTEGER
            );`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
                uid SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                team_id INTEGER,
                rank INTEGER NOT NULL,
                user_scores INTEGER[][],
                email VARCHAR(50) NOT NULL UNIQUE,
                method VARCHAR(50) NOT NULL,
                password VARCHAR(100) NOT NULL,
                CONSTRAINT fk_team
                FOREIGN KEY(team_id) 
                REFERENCES teams(team_id)
                ON DELETE SET NULL
            );`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS toverify(
                vid SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                rank INTEGER NOT NULL
            );`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS sublogs(
                sid SERIAL PRIMARY KEY,
                chall_id INTEGER NOT NULL REFERENCES challenges(chall_id),
                team_id INTEGER NOT NULL REFERENCES teams(team_id),
                flag VARCHAR(50) NOT NULL,
                ip INET NOT NULL,
                subtime TIMESTAMP NOT NULL,
                correct BOOLEAN NOT NULL
            );`
        );
        resolve()
    });
}

module.exports = { pool, init_db };