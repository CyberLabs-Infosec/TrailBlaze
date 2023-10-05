const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/scores").get(async (req, res) => {
    try {
        const scores = await pool.query("SELECT team_id, teamname, last_solved, current_point FROM teams");
        res.status(200).json({ status: "success", error: "", scores: scores.rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "fail", error: "Internal server error" });
    }
})

module.exports = router;