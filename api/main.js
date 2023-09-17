const express = require("express");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const { init_db } = require("./db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const challRoutes = require("./routes/chall");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chall", challRoutes);

var PORT = process.env.SERVICE_PORT;

async function startApp() {
    await init_db();

    // THIS SECTION IS TO INITIALIZE 20 DUMMY CHALLENGES (!! TO BE DELETED LATER !!)

    const challs = require("./dummy_challs/challs.json");
    const { pool } = require("./db");
    const format = require('pg-format');
    await pool.query("DELETE FROM challenges");
    await pool.query(format("INSERT INTO challenges (place, checkPoint, title, prompt, flag, points) VALUES %L", challs));

    // END OF THE SECTION

    console.log("Tables created successfully !");
    app.listen(PORT, () => {
        console.info(`API listening on port ${PORT}`);
    });
}

startApp();