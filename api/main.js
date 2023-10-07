const express = require("express");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const { init_db } = require("./db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const challRoutes = require("./routes/chall");
const adminRoutes = require("./routes/admin");
const scoreRoutes = require("./routes/scoreboard");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chall", challRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/scoreboard", scoreRoutes);

app.enable('trust proxy')

var PORT = process.env.SERVICE_PORT;

async function startApp() {
    await init_db();

    // THIS SECTION IS TO INITIALIZE 20 DUMMY CHALLENGES (!! TO BE DELETED LATER !!)
    // IMP :- CHANGE THE DB INIT FOR CHALLENGES ELSE ALL CHALLS WILL BE LOST !!!!!!

    const challs = require("./dummy_challs/new.json");
    const { pool } = require("./db");

    for (chall of challs) {
        await pool.query("INSERT INTO challenges (title, prompt, place, checkPoint, flag, isStatic, points, hints, solves, visible, files, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", chall);
    }
    // END OF THE SECTION

    console.log("Tables created successfully !");
    app.listen(PORT, () => {
        console.info(`API listening on port ${PORT}`);
    });
}

startApp();