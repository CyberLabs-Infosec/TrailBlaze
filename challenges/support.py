import psycopg2
import psycopg2.extras
import json
import random
from hashlib import md5
import segno
from PIL import Image
import os

config = {
    "user": "postgres",
    "password": "secret",
    "host": "postgres"
}

conn = psycopg2.connect(host=config["host"], user=config["user"], password=config["password"])


class buildFile:
    def run(self, chall_id, file, place, team_id):        
        self.config = json.loads(open("level_" + str(place) + "/config.json", "r").read())
        isStatic = self.config["isStatic"]

        if isStatic:
            try:
                return {"success": True, "data": f"level_{place}/sources/{file}"}
            except Exception as e:
                print(f"Error in retrieving file: {e}")
                return {"success": False, "data": f"Static file level_{place}/sources/{file} doesn't exist"}

        status = getFlag(chall_id, team_id, place)

        if not status["success"]:
            return {"success": False, "data": status["data"]}
        
        flag = status["data"]
        fileName = f"{place}_{team_id}_{file}"

        if str(place) == "17":
            random.seed(0x1337)
            flag_list = list(flag)
            random.shuffle(flag_list)
            shuffled_flag = "".join(char.encode().hex() for char in flag)
            try:
                data = open(f"level_17/sources/{file}", "r").read()
                open(f"tmp/{fileName}", "w").write(data + f"# Modified flag is: {shuffled_flag}")
                return {"success": True, "data": f"tmp/{fileName}"}
            except:
                return {"success": False, "data": f"{file} not found place={place}"}
    
        if str(place) == "15":
            if file != "660*660.txt":
                return {"success": False, "data": f"{file} not found place={place}"}
            try:
                qr = segno.make_qr(flag)
                tempName = md5(random.randbytes(5)).hexdigest()
                qr.save(f"tmp/{tempName}.png", scale=20, border=2)
                img = Image.open(f"tmp/{tempName}.png")
                pixels = list(img.getdata())
                final = "".join("0" if pixels[(img.width * x) + y] == 255 else "1" for x in range(img.height) for y in range(img.width))
                open(f"tmp/{fileName}", "w").write(final)
                os.remove(f"tmp/{tempName}.png")
                return {"success": True, "data": f"tmp/{fileName}"}
            except Exception as e:
                return {"success": False, "data": f"Error in level_15: QR generation {e}"}

def getFlag(chall_id, team_id, place):
    curr = conn.cursor()
    try:
        curr.execute("""
                    SELECT flag FROM challenges WHERE chall_id=%s AND place=%s;
                    """, (chall_id, place, ))
        test = curr.fetchone()
        curr.close()
        if test is None:
            return {"success": False, "data": f"chall_id: {chall_id} and place: {place} doesn't match"}
    except Exception as e:
        return {"success": False, "data": f"Error in checking chall_id and place: {e}"}

    try:
        curr = conn.cursor()
        curr.execute("""
                    SELECT flags FROM teams WHERE team_id=%s;
                    """, (team_id,))
        flags = curr.fetchone()[0]
        curr.close()
    except Exception as e:
        return {"success": False, "data": f"Error in retrieving flag: {e}"}
    try:
        tobeSent = flags[chall_id]
    except Exception as e:
        return {"success": False, "data": f"flag not found for given chall_id {chall_id}"}
    return {"success": True, "data": tobeSent}
