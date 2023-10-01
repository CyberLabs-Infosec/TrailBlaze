const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/getchalls").get(async (req, res) => {
    try {
        const challs = await pool.query("SELECT chall_id, title, prompt, place, checkpoint, points, hints, solves, visible, files FROM challenges");
        const solved = await pool.query("SELECT last_solved FROM teams WHERE team_id=$1", [req.user.team_id]);
        return res.status(200).json({ status: "success", error: "", data: challs.rows, solved: solved.rows[0].last_solved });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "Internal server error occured, contact admin" });
    }
})

router.route("/submit").post(async (req, res) => {
    const { chall_id, flag } = req.body;
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    ip = ip.split(", ")[1];

    if (!chall_id || !flag) {
        return res.status(400).json({ status: "fail", error: "Please submit a flag!" });
    }

    try {
        const chall = await pool.query("SELECT flag, points, place FROM challenges WHERE chall_id=$1", [chall_id]);
        const dbFlag = chall.rows[0].flag;
        const place = chall.rows[0].place;

            /*
                point allocation logic for submiting correct flag
                1 -> Update user score [How timestamp ?]
                2 -> Update team score
            */

        try {
            const result = await pool.query("SELECT current_point, last_solved FROM teams WHERE team_id=$1", [req.user.team_id]);

            if (result.rows[0].last_solved < place) {
                return res.status(400).json({ status: "fail", error: "You have to follow path, teleportation isn't invented yet!!" });
            } else if (result.rows[0].last_solved > place) {
                return res.status(400).json({ status: "fail", error: "Head towards earth, not back!" });
            }
            
            if (flag === dbFlag) {
                const currPoint = result.rows[0].current_point;
                var deltaTime = ((new Date() - new Date(process.env.EVENT_START)) / 1000);

                await pool.query("INSERT INTO sublogs (chall_id, team_id, flag, ip, subtime, correct) VALUES ($1, $2, $3, $4, $5, $6)", [chall_id, req.user.team_id, flag, ip, new Date(), true]);
                
                await pool.query(`UPDATE teams SET team_scores=(SELECT array_cat(team_scores, '{${deltaTime.toFixed()}, ${currPoint + chall.rows[0].points}}') FROM teams WHERE team_id=$1) WHERE team_id=$1`, [req.user.team_id]);
                await pool.query(`UPDATE users SET user_scores=(SELECT array_cat(user_scores, '{${deltaTime.toFixed()}, ${currPoint + chall.rows[0].points}}') FROM users WHERE uid=$1) WHERE uid=$1`, [req.user.uid]);

                await pool.query("UPDATE teams SET current_point=$1, last_solved=$2", [currPoint + chall.rows[0].points, place + 1]);

                return res.status(200).json({ status: "success", correct: true, error: "" });
            } else {
                await pool.query("INSERT INTO sublogs (chall_id, team_id, flag, ip, subtime, correct) VALUES ($1, $2, $3, $4, $5, $6)", [chall_id, req.user.team_id, flag, ip, new Date(), false]);
                return res.status(200).json({ status: "success", correct: false, error: "" });
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({ status: "fail", error: "Internal server error occured, contact admin" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "Internal server error occured, contact admin" });
    }
})

module.exports = router;