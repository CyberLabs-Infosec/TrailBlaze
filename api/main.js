const express = require("express");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const { init_db } = require("./db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

var PORT = process.env.SERVICE_PORT;

async function startApp() {
    await init_db();
    console.log("Tables created successfully !");
    app.listen(PORT, () => {
        console.info(`API listening on port ${PORT}`);
    });
}

startApp();