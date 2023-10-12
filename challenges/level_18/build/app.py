from flask import Flask, request, render_template, make_response
import jwt
from db import getTeamID, getFlag

app = Flask(__name__)
app.config['secret_key'] = 's3cr3t'
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


@app.route('/', methods=['GET'])
def verify_token():
    result = verify(request)
    if not result["success"]:
        if "Token not found" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please login to your trailblaze account at https://trailblaze.space/ If the issue doesn't resolve, please contact admin")
        if "create/join" in result["data"]:
            app.logger.warning(result["data"])
            return render_template("index.html", result="Please join/create a team")
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    team_id = result["data"]["team_id"]
    result = getFlag(team_id, place=18)
    if not result["success"]:
        app.logger.warning(result["data"])
        return render_template("index.html", result="There was an internal error, Please contact admin")
    flag = result["data"]

    try:
        token = request.cookies["editme"]
    except Exception as e:
        app.logger.warning(f"Cookies not found: {e}")
        resp = make_response(render_template("index.html", result="Hello Commander Nobody! this portal is accessible only by Commander Alex."))
        resp.set_cookie("editme", jwt.encode({"name": "Nobody"}, app.config["secret_key"], algorithm="HS256"))
        return resp

    try:
        msg = jwt.decode(token, app.config["secret_key"], algorithms=['HS256'])
        user = msg["name"]
    except:
        app.logger.warning(f"editme verification: {e}")
        return render_template("index.html", result="Intruder detected! Alerting all systems")

    if user == "Alex":
        return render_template("index.html", result=f"Hello Commander Alex! here is your flag: {flag}")

    return render_template("index.html", result=f"Hello Commander {user}! this portal is accessible only by Commander Alex.")

if __name__ == '__main__':
    app.run(debug=True)
