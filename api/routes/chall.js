const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/getchalls").get(async (req, res) => {
    const challs = await pool.query("SELECT chall_id, title, prompt, place, checkpoint, points, hints, solves, visible FROM challenges");
    res.status(200).json({ status: "success", error: "", data: challs.rows });
})

router.route("/submit").post(async (req, res) => {
    const { chall_id, flag } = req.body;

    if (!chall_id || !flag) {
        return res.status(400).json({ status: "fail", error: "Please submit a flag!" });
    }

    try {
        const chall = await pool.query("SELECT flag FROM challenges WHERE chall_id=$1", [chall_id]);
        const dbFlag = chall.rows[0].flag;

        if (flag === dbFlag) {
            /*
                point allocation logic for submiting correct flag
                1 -> Update user score [How timestamp ?]
                2 -> Update team score
            */
            return res.status(200).json({ status: "success", correct: true, error: "" });
        } else {
            return res.status(200).json({ status: "success", correct: false, error: "" });
        }
    } catch (err) {
        res.status(500).json({ status: "fail", error: "Internal server error occured, contact admin" });
        console.log(err);
        return;
    }
})

module.exports = router;