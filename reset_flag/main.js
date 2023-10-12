const { pool } = require("./db");
const bcrypt = require('bcrypt');

const updateDB = async () => {
    try {
        const challs = await pool.query("SELECT chall_id, flag, isStatic FROM challenges");
        const teams = await pool.query("SELECT team_id FROM teams");

        for (var team of teams.rows) {
            var flags = {};
            var team_id = team.team_id;
            for (var i of challs.rows) {
                if (!i.isstatic) {
                    hashedFlag = await bcrypt.hash(i.flag, 10);
                    flags[i.chall_id] = `blaze{${i.flag}_${hashedFlag.substring(hashedFlag.length - 10)}}`;
                } else {
                    flags[i.chall_id] = `blaze{${i.flag}}`;
                }
            }
            
            await pool.query("UPDATE teams SET flags=$1 WHERE team_id=$2", [JSON.stringify(flags), team_id]);
            console.log(`Updated team ${team_id}`)
        }
        console.log("Done")
    } catch(err) {
        console.log(err);
    }
}

updateDB();