const express = require("express");
const router = express.Router();

const { pool } = require("../db");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/mailer");

require('dotenv').config();

const getToken = (userInfo, expTime) => {
    return jwt.sign(userInfo, process.env.MAIL_SECRET, { expiresIn: expTime });
}

const verifyToken = (token) => {
    try {
        return { status: "success", mail: jwt.verify(token, process.env.MAIL_SECRET).email };
    } catch (err) {
        return { status: "fail", mail: "" };
    }
}

router.route("/ping").get((_, res) => {
    return res.status(200).send("pong");
})

router.route("/verify/:token").get(async (req, res) => {
    const { token } = req.params;
    const verified = verifyToken(token);
    if (verified.status == "fail") {
        return res.status(400).json({ status: "fail", error: "Invalid verification link" });
    } else {
        const result = await pool.query(`
            SELECT * FROM toverify WHERE email=$1;
        `, [verified.mail]);

        if (result.rows.length != 0) {
            const { vid, username, email, adm_no, password, rank } = result.rows[0];
            
            try {
                await pool.query(`
                    INSERT INTO users (username, email, adm_no, method, password, rank) VALUES ($1, $2, $3, $4, $5, $6);
                `, [username, email, adm_no, "regular", password, rank]);
            } catch(err) {
                console.log(`Error inserting in database\n${err}`);
                return res.status(500).json({ status: "fail", error: "There was an internal error, Please contact admin" });
            }

            const inDB = await pool.query(`
                SELECT uid, username, email, method, password, rank FROM users WHERE email=$1;
            `, [email])

            await pool.query(`
                DELETE FROM toverify WHERE vid=$1;
            `, [vid]);

            res.set({
                'Set-Cookie': `token=${getToken({ uid: inDB.rows[0].uid, username: username, email: email, adm_no: adm_no, rank: rank }, "12h")}; Path=/`
            });
            return res.status(200).redirect("/");
            
        } else {
            return res.status(400).redirect("/register");
        }
    }
})

router.route("/register").post(async (req, res) => {
    const reqBody = req.body;
    const { method } = reqBody;

    if (method == "regular") {
        const { username, email, adm_no, password } = reqBody;

        // rank -> 1 = admin
        //         2 = manager
        //         3 = student

        if (!(email && password && username && adm_no)) {
            return res.status(400).json({ status: "fail", error: "All fields are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(`
            SELECT uid FROM users WHERE email=$1;
        `, [email]);
        
        if (result.rows.length == 0) {
            const token = getToken({ email: email }, "1h");

            try {
                await pool.query(`
                    INSERT INTO toverify (username, email, adm_no, password, rank) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO UPDATE SET username = excluded.username, password = excluded.password, rank = excluded.rank, adm_no = excluded.adm_no;
                `, [username, email, adm_no, hashedPassword, 3]);
            } catch(err) {
                console.log(`Error inserting in database\n${err}`);
                return res.status(500).json({ status: "fail", error: "There was an internal error, Please contact admin" });
            }

            const options =  {
                to: email,
                subject: "Activate your account",
                html: `
                <div>
                    <p>Welcome to TrailBlaze: Lost in Space! Click on link below to verify your account</p>
                    <br><a href=${req.get('origin')}/api/auth/verify/${token}>${req.get('origin')}/api/auth/verify/${token}</a>
                </div>
                `,
                textEncoding: 'base64',
                headers: [
                    { key: 'X-Application-Developer', value: 'Atish Shah' },
                ],
            };

            try {
                await sendMail(options);
            } catch (err) {
                console.log(err);
                return res.status(500).json({ status: "fail", error: "There was an email error, Please contact admin" });
            }
        } else {
            return res.status(409).json({ status: "fail", error: "E-mail already registered" })
        }

        return res.status(200).json({ status: "success", error: "" });
    } else if (method == "google") {
        const { code } = reqBody;
        var data = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'client_id': process.env.GOOGLE_CLIENT_ID,
                'client_secret': process.env.GOOGLE_CLIENT_SECRET,
                'redirect_uri': `${req.get('origin')}/register/`,
                'code': code
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        var jsonData = await data.json();
        if (jsonData.error == undefined) {
            const usrData = JSON.parse(atob(jsonData.id_token.split(".")[1]));
            const result = await pool.query(`
                SELECT uid FROM users WHERE email=$1;
            `, [usrData.email]);

            if (result.rows.length == 0) {
                if (usrData.email_verified) {

                    try {
                        await pool.query(`
                            INSERT INTO users (username, email, adm_no, method, password, rank) VALUES ($1, $2, $3, $4, $5, $6);
                        `, [usrData.name, usrData.email, "", "google", "", 3]);
                    } catch(err) {
                        console.log(err);
                        return res.status(500).json({ status: "fail", error: "There was an internal error, Please contact admin" });
                    }

                    const inDB = await pool.query(`
                        SELECT uid, username, email, method, password, rank FROM users WHERE email=$1;
                    `, [usrData.email])
                    res.set({
                        'Set-Cookie': `token=${getToken({ uid: inDB.rows[0].uid, username: inDB.rows[0].username, email: inDB.rows[0].email, rank: 3 }, "12h")}; Path=/`
                    });
                    const user = await pool.query(`
                        SELECT u.uid, u.team_id, u.username, u.adm_no, u.email, u.rank, t.teamname FROM users AS u LEFT JOIN teams AS t ON u.team_id=t.team_id WHERE u.email=$1;
                    `, [inDB.rows[0].email]);
                    return res.status(200).json({ status: "success", error: "", user: user.rows[0] })
                } else {
                    return res.status(400).json({ status: "fail", error: "Your email is not verified" })
                }
            } else {
                return res.status(409).json({ status: "fail", error: "E-mail already registered" })
            }
        } else {
            return res.status(400).json({ status: "fail", error: jsonData.error });
        }
    }
})

router.route("/login").post(async (req, res) => {
    const reqBody = req.body;
    const { loginMethod } = reqBody;

    if (loginMethod == "regular") {
        const { loginEmail, loginPassword } = reqBody;

        if (loginEmail && loginPassword) {
            const result = await pool.query(`
                SELECT uid, username, email, method, password, rank FROM users WHERE email=$1;
            `, [loginEmail])
            if (result.rowCount != 0) {
                const { uid, username, email, method, password, rank } = result.rows[0];

                if (method != loginMethod) {
                    return res.status(401).json({ status: "fail", error: "Please use your login method same as the registration method" });
                }

                const match = await bcrypt.compare(loginPassword, password);
                
                if (match) {
                    res.set({
                        'Set-Cookie': `token=${getToken({ uid: uid, username: username, email: email, rank: rank }, "12h")}; Path=/`
                    });
                    const user = await pool.query(`
                        SELECT u.uid, u.team_id, u.username, u.adm_no, u.email, u.rank, t.teamname FROM users AS u LEFT JOIN teams AS t ON u.team_id=t.team_id WHERE u.email=$1;
                    `, [email]);
                    res.status(200).json({ status: "success", error: "", user: user.rows[0] });
                } else {
                    res.status(401).json({ status: "fail", error: "You entrered wrong credentials" });
                }
            } else {
                res.status(400).json({ status: "fail", error: "Your email was never registered" });
            }
        } else {
            res.status(400).json({ status: "fail", error: "Please enter something" });
        }
    } else if (loginMethod == "google") {
        const { code } = reqBody;
        var data = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'client_id': process.env.GOOGLE_CLIENT_ID,
                'client_secret': process.env.GOOGLE_CLIENT_SECRET,
                'redirect_uri': `${req.get('origin')}/login/`,
                'code': code
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        var jsonData = await data.json();
        if (jsonData.error == undefined) {
            const usrData = JSON.parse(atob(jsonData.id_token.split(".")[1]));
            const result = await pool.query(`
                SELECT uid FROM users WHERE email=$1;
            `, [usrData.email]);

            if (result.rowCount == 0) {
                return res.status(400).json({ status: "fail", error: "E-mail is not registered" });
            } else {
                res.set({
                    'Set-Cookie': `token=${getToken({ uid: result.rows[0].uid, username: usrData.name, email: usrData.email, rank: 3 }, "12h")}; Path=/`
                });
                const user = await pool.query(`
                    SELECT u.uid, u.team_id, u.username, u.adm_no, u.email, u.rank, t.teamname FROM users AS u LEFT JOIN teams AS t ON u.team_id=t.team_id WHERE u.email=$1;
                `, [usrData.email]);
                return res.status(200).json({ status: "success", error: "", user: user.rows[0] });
            }
        } else {
            return res.status(400).json({ status: "fail", error: jsonData.error });
        }
    }
})

module.exports = router;