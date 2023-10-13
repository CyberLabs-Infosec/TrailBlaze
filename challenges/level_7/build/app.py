from flask import Flask, render_template, request, redirect
import jwt, hashlib

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
            if "create/join" in status["data"]:
                return {"success": False, "data": "Please create/join team"}
            return {"success": False, "data": "There was an internal error, Please contact admin"}
        return {"success": True, "data": status["data"]}
    except Exception as e:
        return {"success": False, "data": f"Token verification failed: {e}"}

           
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST', "GET"])
def submit():
    if request.method == "GET":
        return redirect("/")
    result = verify(request)
    if not result["success"]:
        if "Token not found" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please login to your trailblaze account at https://trailblaze.space/ If the issue doesn't resolve, please contact admin")
        if "create/join" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please join/create a team")
        app.logger.warning(result["data"])
        return render_template("index.html", result="Please login to your trailblaze account at https://trailblaze.space/. If the issue doesn't resolve, please contact admin")
    team_id = result["data"]["team_id"]
    result = getFlag(team_id, place=7)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    flag = result["data"]
    try:
        password = request.form['password']
    except Exception as e:
        app.logger.warning("Missing request parameters")
        return render_template("index.html", result="Password required! no bypasses -_-")

    res = check(password, flag)
    return render_template('index.html', result=res)    


def check(a, flag):
    a = str(a).strip()
    hash = hashlib.md5(a.encode()).hexdigest()

    if hash == "78c11279e660a0926b51d5bac65cefd8":
        return f"Verified. Here is your flag: {flag}"
    
    return "Wrong password!"
