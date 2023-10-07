from flask import Flask, render_template, request
import psycopg2
import jwt

app = Flask(__name__)
app.config["secret"] = "L6LdwHrLcvEh7CwkxGGhAy7xKWUoHaEN9GTjr1dc2O4y2CkGsuQvAtOYYpyJBG1H"
config = {
    "user": "postgres",
    "password": "secret",
    "host": "postgres"
}

conn = psycopg2.connect(host=config["host"], user=config["user"], password=config["password"])

def getFlag(team_id, place):
    curr = conn.cursor()
    try:
        curr.execute("""
                    SELECT chall_id FROM challenges WHERE place=%s;
                    """, (place, ))
        chall_id = curr.fetchone()
        curr.close()
        if chall_id is None:
            return {"success": False, "data": f"chall_id does not exist for place: {place}"}
    except Exception as e:
        return {"success": False, "data": f"Error in retrieving chall_id: {e}"}

    try:
        curr = conn.cursor()
        curr.execute("""
                    SELECT flags FROM teams WHERE team_id=%s;
                    """, (team_id,))
        flags = curr.fetchone()[0]
        curr.close()
    except Exception as e:
        return {"success": False, "data": f"Error in retrieving flags: {e}"}
    try:
        tobeSent = flags[chall_id]
    except Exception as e:
        return {"success": False, "data": f"flag not found for given chall_id {chall_id}"}
    return {"success": True, "data": tobeSent}


def verify(req):
    try:
        token = req.cookies["token"]
    except Exception as e:
        return {"success": False, "data": f"Token not found: {e}"}
    
    try:
        data = jwt.decode(token, app.config["secret"])
        uid = data["uid"]
        curr = conn.cursor()
        curr.execute("""
                        SELECT team_id FROM users WHERE uid=%s;
                    """, (uid, ))
        team_id = curr.fetchone()[0]
        curr.close()
        return {"success": True, "data": {"team_id": team_id}}
    except Exception as e:
        return {"success": False, "data": f"Token verification failed: {e}"}
    
                                        
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test_form', methods=['POST'])
def test_form():
    result = verify(request)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    team_id = result["team_id"]
    result = getFlag(team_id, place=11)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    flag = result["data"]
    try:
        a = request.form['a']
        b = request.form['b']
    except Exception as e:
        app.logger.warning("Missing request parameters")
        return render_template("index.html", result="Enter both the numbers")
    
    if not a.isnumeric() or not b.isnumeric():
        app.logger.warning("Entered non numeric characters")
        return render_template("index.html", result="Only numbers allowed!")

    res = check_overflow(a, b, flag)
    return render_template('index.html', result=res)

def evaluate(val):
    val = int(val)
    val = val % 4294967296
    if val > 2147483647:
        val = val - 4294967296
    return val

def check_overflow(a, b, flag):
    if a < 0 or b < 0:
        return("Hehe! You can't trick me, Only postive numbers allowed!")

    a = evaluate(a)
    b = evaluate(b)
    sum = evaluate(a + b)

    if sum > 0:
        return("Sensors are high on coolant. REPAIR ASAP!")
    else:
        return(f"System repair initiated. Here is your reward: {flag}")