const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/verify").get(async (req, res) => {
    res.status(200).json({ status: "success", error: "", data: { username: req.user.username, phone: req.user.phone, email: req.user.email } });
})

router.route("/edit").post(async (req, res) => {
    const { phone, username } = req.body;

    if (!phone || !username) {
        return res.status(401).json({ status: "fail", error: "All fields are required" });
    }

    try {
        await pool.query("UPDATE users SET phone=$1, username=$2 WHERE email=$3", [phone, username, req.user.email]);
    } catch {
        return res.status(401).json({ status: "fail", error: "The name or phone is already registered" });
    }
    return res.status(200).json({ status: "success", error: "" });
})

module.exports = router;