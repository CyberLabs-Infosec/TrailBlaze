const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/getchalls").get(async (req, res) => {
    const challs = await pool.query("SELECT chall_id, title, prompt, place, checkPoint, flag, points, hints, solves, visible FROM challenges");
    res.status(200).json({ status: "success", error: "", data: challs.rows });
})

router.route("/editchall").post(async (req, res) => {
    const { chall_id, title, prompt, flag, hintArray, points } = req.body;

    const challs = await pool.query("UPDATE TABLE challenges SET title = $1, prompt = $2, flag = $3, points = $4, hints = $5 WHERE chall_is = $6;", [title, prompt, flag, points, hintArray, chall_id]);
    console.log(challs.rows)
    res.status(200).json({ status: "success", error: "" });
})

module.exports = router;