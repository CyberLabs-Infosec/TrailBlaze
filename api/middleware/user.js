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
                SELECT u.id, u.team_id, u.username, u.phone, u.email, u.uid, t.teamname FROM users AS u LEFT JOIN teams AS t ON u.team_id=t.team_id WHERE u.email=$1;
            `, [decoded.email]);
            if (user.rowCount == 0) {
                return res.status(400).json({ status: "fail", error: "User not found in database" });
            }
            req.user = user.rows[0];
            next();
        }
    });
}