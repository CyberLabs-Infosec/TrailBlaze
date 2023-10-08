from hashlib import md5
import segno
from PIL import Image
from db import getFlag

import os, base64, random, json

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
            
        if str(place) == "2":
            if file != "encoded.txt":
                return {"success": False, "data": f"{file} not found place={place}"}
            try:
                open(f"tmp/{fileName}", "w").write(f"Here's the way forward: {base64.b64encode(flag.encode().hex().encode()).decode()}")
                return {"success": True, "data": f"tmp/{fileName}"}
            except Exception as e:
                return {"success": False, "data": f"Error in level_2: encoding {e}"}
        
        if str(place) == "11":
            if file != "repairMe.c":
                return {"success": False, "data": f"{file} not found place={place}"}
            try:
                return {"success": True, "data": f"level_11/sources/{file}"}
            except Exception as e:
                return {"success": False, "data": f"Error in level_11: sharing {e}"}
            
  