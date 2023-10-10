from flask import Flask, render_template, request
import jwt

from db import getFlag, getTeamID

app = Flask(__name__)
app.config["secret"] = "1mokPoWeR73vWcDTTJIDZqjsypEOSxnF2Iwrf4ADc9wAx8a3jp9Yx3hJHr99E0U7"


def verify(req):
    try:
        token = req.cookies["token"]
    except Exception as e:
        return {"success": False, "data": f"Token not found: {e}"}
    
    try:
        data = jwt.decode(token, app.config["secret"], algorithms=["HS256"])
        uid = data["uid"]
        status = getTeamID(uid)
        
        if not status["success"]:
            if status["data"] == "Please create/join team":
                return {"status": "fail", "error": "Please create/join team"}
            app.logger.warning(status["data"])
            return {"status": "fail", "error": "There was an internal error, Please contact admin"}
        return {"success": True, "data": status["data"]}
    except Exception as e:
        return {"success": False, "data": f"Token verification failed: {e}"}

           
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test_form', methods=['POST'])
def test_form():
    result = verify(request)
    if not result["success"]:
        if "Token not found" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please login to your trailblaze account at https://trailblaze.space/. If the issue doesn't resolve, please contact admin")
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    team_id = result["data"]["team_id"]
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
    a = int(a)
    b = int(b)
    
    if a < 0 or b < 0:
        return("Hehe! You can't trick me, Only postive numbers allowed!")

    a = evaluate(a)
    b = evaluate(b)
    sum = evaluate(a + b)

    if sum > 0:
        return("Sensors are high on coolant. REPAIR ASAP!")
    else:
        return(f"System repair initiated. Here is your reward: {flag}")