const jwt = require("jsonwebtoken");
const { pool } = require("../db");

require('dotenv').config();

module.exports = async function User(req, res, next) {
    const token = req.get("Authorization");
    if (!token) {
        return res.status(400).json({ status: "fail", error: "Please login" });
    }

    jwt.verify(token.split(" ")[1], process.env.MAIL_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(400).json({ status: "fail", error: "Invalid token" });
        } else {
            const user = await pool.query(`
                SELECT * FROM users WHERE email=$1
            `, [decoded.email]);
            req.user = user.rows[0];
            next();
        }
    });
}