const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user");
router.use(userMiddleware);

const { pool } = require("../db");

router.route("/getchalls").get(async (req, res) => {
    pool.query("SELECT chall_id, title, prompt, place, checkPoint, flag, points, hints, files, solves, visible FROM challenges ORDER BY place;", [], (error, result) => {
        if (error){
            console.log(error)
            res.status(500).json({ status: "failure", error: "InternalServerError: Please check logs", data: "" });
        } else {
            res.status(200).json({ status: "success", error: "", data: result.rows })
        }
    });
})

router.route("/editchall").post(async (req, res) => {
    const { chall_id, titlePost, promptPost, flagPost, hintArray, pointsPost, visiblePost, filesPost } = req.body;

    // REMOVE THIS
    console.log(
        `
        challID: ${chall_id}
        title: ${titlePost}
        prompt: ${promptPost}
        flag: ${flagPost}
        hints: ${hintArray}
        points: ${pointsPost}
        visibility: ${visiblePost}
        files: ${filesPost}
        `
    )
    // REMOVE THIS

    pool.query("UPDATE challenges SET title=$1, prompt=$2, flag=$3, points=$4, hints=$5, files=$6 WHERE chall_id=$7;", [titlePost, promptPost, flagPost, pointsPost, hintArray, filesPost, chall_id], (error, result) => {
        if (error){
            console.log(error)
            res.status(500).json({ status: "failure", error: "InternalServerError: Please check logs", data: "" });
        } else {
            res.status(200).json({ status: "success", error: "", data: "" });
        }
    })
})

module.exports = router;