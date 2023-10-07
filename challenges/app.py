from flask import Flask
from flask import send_file, request
from support import buildFile
import os

app = Flask(__name__)


@app.route("/files/ping")
def ping():
    return {"status": "success", "data": "pong"}


@app.route("/files/<file>", methods=["GET"])
def returnFiles(file):
    try:
        chall_id = request.args.get("chall_id")
        place = request.args.get("place")
        team_id = 1
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

if __name__ == "__main__":
    app.run(debug=True, port=15004, host="0.0.0.0")