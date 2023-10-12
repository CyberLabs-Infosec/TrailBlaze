from flask import Flask, render_template, request, redirect
from db import getFlag, getTeamID
import jwt

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
            if "create/join" in status["data"]:
                return {"success": False, "data": "Please create/join team"}
            return {"success": False, "data": "There was an internal error, Please contact admin"}
        return {"success": True, "data": status["data"]}
    except Exception as e:
        return {"success": False, "data": f"Token verification failed: {e}"}
    

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    if request.method == "GET":
        return redirect("/")
    result = verify(request)
    if not result["success"]:
        if "Token not found" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please login to your trailblaze account at https://trailblaze.space/. If the issue doesn't resolve, please contact admin")
        if "create/join" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please join/create a team")
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    team_id = result["data"]["team_id"]
    result = getFlag(team_id, place=10)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    flag = result["data"]
    try:
        num1 = request.form['num1'].strip()
        num2 = request.form['num2'].strip()
    except Exception as e:
        app.logger.warning("Missing request parameters")
        return render_template("index.html", result="Enter both the numbers")

    if not num1.isnumeric() or not num2.isnumeric():
        app.logger.warning("Entered non numeric characters")
        return render_template("index.html", result="Only positive numbers allowed!")  

    xor_result = num1 ^ num2
    if xor_result == 1023:
        return render_template("index.html", result=f"Sequence matched! here is the location: {flag}")
    return render_template("index.html", result=f"XOR result: {result}")    
    