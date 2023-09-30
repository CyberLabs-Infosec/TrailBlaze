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
    const { chall_id, title, prompt, flag, points, hints, visible } = req.params;
    console.log(chall_id, title, prompt);
    const challs = await pool.query("SELECT chall_id, title, prompt, place, checkpoint, points, hints, solves, visible FROM challenges");
    res.status(200).json({ status: "success", error: "" });
})

module.exports = router;