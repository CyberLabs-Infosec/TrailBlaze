from flask import Flask, render_template, request, session
from flask_session import Session
import jwt, random

from db import getFlag, getTeamID

app = Flask(__name__)
app.config["secret"] = "1mokPoWeR73vWcDTTJIDZqjsypEOSxnF2Iwrf4ADc9wAx8a3jp9Yx3hJHr99E0U7"
app.secret_key = "v3ryy_p00w3rphu11_s3cr37_k4y"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


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


@app.route('/<int:page>', methods=["GET"])
def returnFlag(page):
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
    result = getFlag(team_id, place=19)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    flag = result["data"]

    if not session["page"]:
        session["page"] = random.choice(range(1, 500))
    
    if page == session["page"]:
        return render_template("template.html", result=f"You did it!! flag: {flag}", page=page)
    
    return render_template("template.html", result=f"Nothing here", page=page)
