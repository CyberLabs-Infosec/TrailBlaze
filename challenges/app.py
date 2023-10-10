from flask import Flask
from flask import send_file, request

from support import buildFile
from db import getFlag, getTeamID

import os
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
            if status["data"] == "Please create/join team":
                return {"success": "fail", "error": "Please create/join team"}
            app.logger.warning(status["data"])
            return {"success": "fail", "error": "There was an internal error, Please contact admin"}
        return {"success": True, "data": status["data"]}
    except Exception as e:
        return {"success": False, "data": f"Token verification failed: {e}"}


@app.route("/files/ping")
def ping():
    return {"status": "success", "data": "pong"}


@app.route("/files/<file>", methods=["GET"])
def returnFiles(file):
    result = verify(request)
    if not result["success"]:
        app.logger.warning(result["data"])
        return {"status": "fail", "error": "Please login again!"}
    try:
        chall_id = request.args.get("chall_id")
        place = request.args.get("place")
        team_id = result["data"]["team_id"]

    except Exception as e:
        app.logger.warning(f"Error in Request parameters - {e}")
        return {"status": "fail", "error": "There was an internal error, Please contact admin"}
    if place is None or chall_id is None:
        app.logger.warning(f"Request parameters not found")
        return {"status": "fail", "error": "There was an internal error, Please contact admin"}
    
    if os.path.exists(f"tmp/{place}_{team_id}_{file}"):
        return send_file(f"tmp/{place}_{team_id}_{file}", download_name=file, as_attachment=True)
    
    path = buildFile().run(chall_id=chall_id, file=file, place=place, team_id=team_id)
    if not path["success"]:
        app.logger.warning(path["data"])
        return {"status": "fail", "error": "There was an internal error, Please contact admin"}
    
    try:
        return send_file(path["data"], download_name=file, as_attachment=True) 
    except Exception as e:
        app.logger.warning(f"Error in Sending file - {e}")
        return {"status": "fail", "error": "There was an internal error, Please contact admin"}
