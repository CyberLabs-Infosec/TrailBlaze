const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/verify").get(async (req, res) => {
    try {
        return res.status(200).json({ status: "success", error: "", data: req.user });
    } catch {
        return res.status(401).json({ status: "fail", error: "Please login again" });
    }
})

router.route("/edit").post(async (req, res) => {
    let { username } = req.body;

    if (!username) {
        return res.status(401).json({ status: "fail", error: "All fields are required" });
    }

    try {
        await pool.query("UPDATE users SET username=$1 WHERE email=$2", [username, req.user.email]);
    } catch {
        return res.status(401).json({ status: "fail", error: "This should not happen, Contact Admin!" });
    }
    return res.status(200).json({ status: "success", error: "" });
})

router.route("/createteam").post(async (req, res) => {
    const { teamname, secret } = req.body;

    if (!teamname || !secret) {
        return res.status(401).json({ status: "fail", error: "Team cannot have empty fields" });
    }

    const qRes = await pool.query("SELECT team_id FROM teams WHERE teamname=$1", [teamname]);

    if (qRes.rowCount != 0) {
        return res.status(500).json({ status: "fail", error: "This Teamname was already taken" });
    }

    try {
        // ADD unique flags for team
        const challs = await pool.query("SELECT chall_id, flag FROM challenges");
        var flags = {};
        for (var i of challs.rows) {
            hashedFlag = await bcrypt.hash(i.flag, 10);
            flags[i.chall_id] = `flag{${i.flag}_${hashedFlag.substring(hashedFlag.length - 10)}}`;
        }

        const hashedSecret = await bcrypt.hash(secret, 10);
        
        await pool.query("INSERT INTO teams (teamname, secret, team_scores, team_members, captain_id, last_solved, current_point, flags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [teamname, hashedSecret, [[0, 0]], 1, req.user.uid, 0, 0, JSON.stringify(flags)]);
        const qRes = await pool.query("SELECT team_id FROM teams WHERE teamname=$1", [teamname]);
        await pool.query("UPDATE users SET team_id=$1 WHERE uid=$2", [qRes.rows[0].team_id, req.user.uid]);

        return res.status(200).json({ status: "success", error: "" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "Something went wrong" });
    }
})

router.route("/jointeam").post(async (req, res) => {
    const { teamname, secret } = req.body;

    if (!teamname || !secret) {
        return res.status(401).json({ status: "fail", error: "Team cannot have empty fields" });
    }

    try {
        const usrTeam = await pool.query("SELECT team_id FROM users WHERE uid=$1", [req.user.uid]);

        if (usrTeam.rows[0].team_id == null) {
            const qRes = await pool.query("SELECT team_id, secret, team_members FROM teams WHERE teamname=$1", [teamname]);

            if (qRes.rowCount == 0) {
                return res.status(400).json({ status: "fail", error: "Team does not exist" });
            }

            const match = await bcrypt.compare(secret, qRes.rows[0].secret);

            if (match) {
                if (qRes.rows[0].team_members == 3) {
                    return res.status(400).json({ status: "fail", error: "Team is full :(" });
                }
                await pool.query("UPDATE users SET team_id=$1 WHERE uid=$2", [qRes.rows[0].team_id, req.user.uid]);
                await pool.query("UPDATE teams SET team_members=$1", [qRes.rows[0].team_members + 1]);
            } else {
                return res.status(400).json({ status: "fail", error: "Incorrect team credentials" });
            }

            return res.status(200).json({ status: "success", error: "" });
        } else {
            return res.status(400).json({ status: "fail", error: "You can't join multiple teams" });
        }
    } catch(err) {
        console.log(err);
        return res.status(400).json({ status: "fail", error: "Something went wrong" });
    }
})

router.route("/leaveteam").get(async (req, res) => {
    try {
        const qRes = await pool.query("SELECT captain_id, team_members FROM teams WHERE team_id=$1", [req.user.team_id]);

        if (qRes.rows[0].captain_id == req.user.uid) {
            await pool.query("DELETE FROM teams WHERE team_id=$1", [req.user.team_id]);
            return res.status(200).json({ status: "info", error: "", info: "The team was deleted since you are the captain" });
        }

        await pool.query("UPDATE users SET team_id=$1 WHERE uid=$2", [null, req.user.uid]);
        await pool.query("UPDATE teams SET team_members=$1", [qRes.rows[0].team_members - 1]);

        return res.status(200).json({ status: "success", error: "" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "This shouldn't happen, please contact the admin" });
    }
})

router.route("/teaminfo").get(async (req, res) => {
    try {
        if (req.user.team_id) {
            const members = await pool.query("SELECT u.username, u.uid, u.user_scores FROM users AS u WHERE u.team_id=$1;", [req.user.team_id]);
            const captain = await pool.query("SELECT t.captain_id, t.team_scores, t.last_solved FROM teams AS t WHERE t.team_id=$1", [req.user.team_id]);
            const totalChalls = await(pool.query("SELECT COUNT(*) FROM challenges"));
            return res.status(200).json({ status: "success", error: "", data: members.rows, captain_id: captain.rows[0].captain_id, team_scores: captain.rows[0].team_scores, solves: { solved: captain.rows[0].last_solved, unsolved: totalChalls.rows[0].count - captain.rows[0].last_solved } });
        } else {
            res.status(200).json({ status: "success", error: ""})
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "This shouldn't happen, please contact the admin" });
    }
})

module.exports = router;