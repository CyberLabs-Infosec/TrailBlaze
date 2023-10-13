
from flask import Flask, render_template, request, make_response
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
            if "create/join" in status["data"]:
                return {"success": False, "data": "Please create/join team"}
            return {"success": False, "data": "There was an internal error, Please contact admin"}
        return {"success": True, "data": status["data"]}
    except Exception as e:
        return {"success": False, "data": f"Token verification failed: {e}"}

           
@app.route('/', methods=["GET"])
def index():
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
    result = getFlag(team_id, place=16)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    flag = result["data"]

    try:
        Commander = request.cookies["Commander"]
        Name = request.cookies["Name"]
    except Exception as e:
        app.logger.warning(f"Cookies not found: {e}")
        resp = make_response(render_template("index.html"))
        resp.set_cookie("Commander", "false")
        resp.set_cookie("Name", "Nobody")
        return resp

    if Commander == 'true' and Name != 'Alex':
        res = f"Who might you be, Commander of the Unknown? I'm afraid I can't grant you access to the information. My Apologies."
        return render_template('index.html', result=res)
    elif Commander == 'false' and Name == 'Alex':
        res = f"Come on, Pilot Alex, you're no Commander. This information is strictly for those in charge."
        return render_template('index.html', result=res)
    elif Commander == 'false' and Name != 'Alex':
        res = f'Are you truly a pilot? For those who venture here without the right credentials, consider yourselves unwelcome.'
        return render_template('index.html', result=res)
    else:
        res = f'Welcome Commander Alex, here is your Flag: {flag}'
        return render_template('index.html', result=res)