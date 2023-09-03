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
    const { phone, username } = req.body;

    if (!phone || !username) {
        return res.status(401).json({ status: "fail", error: "All fields are required" });
    }

    try {
        await pool.query("UPDATE users SET phone=$1, username=$2 WHERE email=$3", [phone, username, req.user.email]);
    } catch {
        return res.status(401).json({ status: "fail", error: "The name or phone already exists" });
    }
    return res.status(200).json({ status: "success", error: "" });
})

router.route("/createteam").post(async (req, res) => {
    const { teamname, secret } = req.body;

    if (!teamname || !secret) {
        return res.status(401).json({ status: "fail", error: "Team cannot have empty fields" });
    }

    try {
        const hashedSecret = await bcrypt.hash(secret, 10);
        
        await pool.query("INSERT INTO teams (teamname, secret) VALUES ($1, $2)", [teamname, hashedSecret]);
        const qRes = await pool.query("SELECT team_id FROM teams WHERE teamname=$1", [teamname]);
        await pool.query("UPDATE users SET team_id=$1 WHERE id=$2", [qRes.rows[0].team_id, req.user.id]);

        return res.status(200).json({ status: "success", error: "" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "This Teamname was already taken" });
    }
})

router.route("/jointeam").post(async (req, res) => {
    const { teamname, secret } = req.body;

    if (!teamname || !secret) {
        return res.status(401).json({ status: "fail", error: "Team cannot have empty fields" });
    }

    try {
        const usrTeam = await pool.query("SELECT team_id FROM users WHERE id=$1", [req.user.id]);

        if (usrTeam.rows[0].team_id != null) {
            const qRes = await pool.query("SELECT team_id, secret FROM teams WHERE teamname=$1", [teamname]);

            if (qRes.rowCount == 0) {
                return res.status(400).json({ status: "fail", error: "Team does not exists" });
            }

            const match = await bcrypt.compare(secret, qRes.rows[0].secret);

            if (match) {
                await pool.query("UPDATE users SET team_id=$1 WHERE id=$2", [qRes.rows[0].team_id, req.user.id]);
            } else {
                return res.status(400).json({ status: "fail", error: "Incorrect team credentials" });
            }

            return res.status(200).json({ status: "success", error: "" });
        } else {
            return res.status(400).json({ status: "fail", error: "You can't join multiple teams" });
        }
    } catch(err) {
        console.log(err);
        return res.status(400).json({ status: "fail", error: "This teamname was already taken" });
    }
})

router.route("/leaveteam").get(async (req, res) => {
    try {
        await pool.query("UPDATE users SET team_id=$1 WHERE id=$2", [null, req.user.id]);
        return res.status(200).json({ status: "success", error: "" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "This shouldn't happen, please contact the admin" });
    }
})

router.route("/teaminfo").get(async (req, res) => {
    try {
        const members = await pool.query("SELECT u.username FROM users AS u WHERE u.team_id=$1;", [req.user.team_id]);
        return res.status(200).json({ status: "success", error: "", data: members.rows });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ status: "fail", error: "This shouldn't happen, please contact the admin" });
    }
})

module.exports = router;