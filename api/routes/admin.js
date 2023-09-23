const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/editchall").get(async (req, res) => {
    if (req.user.rank != 3){
        res.status(401).json({ status: "failure", error: "unauthorized", data: [] })
    }
    const challs = await pool.query("SELECT chall_id, title, prompt, place, checkpoint, points, hints, solves, visible FROM challenges");
    res.status(200).json({ status: "success", error: "", data: challs.rows });
})

module.exports = router;