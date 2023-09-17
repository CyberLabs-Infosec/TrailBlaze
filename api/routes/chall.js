const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/getchalls").get(async (req, res) => {
    const challs = await pool.query("SELECT chall_id, title, prompt, place, checkpoint, points, hints, solves, visible FROM challenges");
    res.status(200).json({ status: "success", error: "", data: challs.rows });
})

module.exports = router;