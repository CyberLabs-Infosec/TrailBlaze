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
            SELECT * FROM toverify WHERE email=$1
        `, [verified.mail]);

        if (result.rows.length != 0) {
            const { id, username, email, phone, password, uid } = result.rows[0];
            
            await pool.query(`
                INSERT INTO users (username, email, phone, method, password, uid) VALUES ($1, $2, $3, $4, $5, $6);
            `, [username, email, phone, "regular", password, uid]);

            const inDB = await pool.query(`
                SELECT id, username, email, method, password, uid FROM users WHERE email=$1;
            `, [email])

            await pool.query(`
                DELETE FROM toverify WHERE id=$1;
            `, [id]);

            res.set({
                'Set-Cookie': `token=${getToken({ id: inDB.rows[0].id, username: username, email: email, phone: phone, uid: uid }, "12h")}; Path=/`
            });
            return res.status(200).redirect("/");
            
        } else {
            return res.status(400).redirect("/register?error=Unable to verify your E-mail, please register again");
        }
    }
})

router.route("/register").post(async (req, res) => {
    const reqBody = req.body;
    const { method } = reqBody;

    if (method == "regular") {
        const { username, email, phone, password } = reqBody;

        // uids -> 1 = admin
        //         2 = manager
        //         3 = student

        if (!(email && password && username && phone)) {
            return res.status(400).json({ status: "fail", error: "All fields are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(`
            SELECT id FROM users WHERE email=$1;
        `, [email]);
        
        if (result.rows.length == 0) {
            const token = getToken({ email: email }, "1h");
            await pool.query(`
                INSERT INTO toverify (username, email, phone, password, uid) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO UPDATE SET username = excluded.username, password = excluded.password, uid = excluded.uid, phone = excluded.phone;
            `, [username, email, phone, hashedPassword, 3]);
            const options =  {
                to: email,
                subject: "Verify your mail",
                html: `
                <div>
                    <h1>Click the following <a href=${process.env.API_URL}/auth/verify/${token}>link</a> to verify your mail</h1>
                </div>
                `,
                textEncoding: 'base64',
                headers: [
                    { key: 'X-Application-Developer', value: 'Atish Shah' },
                ],
            };

            await sendMail(options);
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
                'redirect_uri': 'http://localhost:4999/register/',
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
                SELECT id FROM users WHERE email=$1;
            `, [usrData.email]);

            if (result.rows.length == 0) {
                if (usrData.email_verified) {
                    await pool.query(`
                        INSERT INTO users (username, email, phone, method, password, uid) VALUES ($1, $2, $3, $4, $5, $6);
                    `, [usrData.name, usrData.email, null, "google", "", 3]);
                    const inDB = await pool.query(`
                        SELECT id, username, email, method, password, uid FROM users WHERE email=$1;
                    `, [usrData.email])
                    res.set({
                        'Set-Cookie': `token=${getToken({ id: inDB.rows[0].id, username: usrData.name, email: usrData.email, uid: 3 }, "12h")}; Path=/`
                    });
                    return res.status(200).json({ status: "success", error: "" })
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
                SELECT id, username, email, method, password, uid FROM users WHERE email=$1;
            `, [loginEmail])
            if (result.rowCount != 0) {
                const { id, username, email, method, password, uid } = result.rows[0];

                if (method != loginMethod) {
                    return res.status(401).json({ status: "fail", error: "Please use your login method same as the registration method" });
                }

                const match = await bcrypt.compare(loginPassword, password);
                
                if (match) {
                    res.set({
                        'Set-Cookie': `token=${getToken({ id: id, username: username, email: email, uid: uid }, "12h")}; Path=/`
                    });
                    res.status(200).json({ status: "success", error: "" });
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
                'redirect_uri': 'http://localhost:4999/login/',
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
                SELECT id FROM users WHERE email=$1;
            `, [usrData.email]);

            if (result.rowCount == 0) {
                return res.status(400).json({ status: "fail", error: "E-mail is not registered" });
            } else {
                res.set({
                    'Set-Cookie': `token=${getToken({ id: result.rows[0].id, username: usrData.name, email: usrData.email, uid: 3 }, "12h")}; Path=/`
                });
                return res.status(200).json({ status: "success", error: "" });
            }
        } else {
            return res.status(400).json({ status: "fail", error: jsonData.error });
        }
    }
})

module.exports = router;