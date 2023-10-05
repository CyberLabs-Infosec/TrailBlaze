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
            `DROP TABLE IF EXISTS challenges; CREATE TABLE challenges(
                chall_id SERIAL PRIMARY KEY,
                title VARCHAR(50) NOT NULL,
                prompt VARCHAR(100) NOT NULL,
                place integer NOT NULL,
                checkPoint boolean DEFAULT FALSE,
                flag text NOT NULL,
                points integer NOT NULL,
                hints text[],
                solves integer,
                visible boolean DEFAULT TRUE,
                files text[] DEFAULT ARRAY[]::text[],
                author text
            )`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS teams(
                team_id SERIAL PRIMARY KEY,
                teamname VARCHAR(50) NOT NULL UNIQUE,
                secret VARCHAR(100) NOT NULL,
                captain_id integer NOT NULL,
                team_members integer,
                team_scores integer[][],
                last_solved integer,
                current_point integer,
                flags json
            );`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
                uid SERIAL PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                team_id integer,
                rank integer NOT NULL,
                user_scores integer[][],
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
                rank integer NOT NULL
            );`
        );
        await pool.query(
            `CREATE TABLE IF NOT EXISTS sublogs(
                sid SERIAL PRIMARY KEY,
                chall_id integer NOT NULL REFERENCES challenges(chall_id),
                team_id integer,
                username VARCHAR(100),
                flag VARCHAR(50) NOT NULL,
                ip inet NOT NULL,
                subtime TIMESTAMP NOT NULL,
                correct boolean NOT NULL
            );`
        );
        resolve()
    });
}

module.exports = { pool, init_db };