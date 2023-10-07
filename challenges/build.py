import psycopg2
import psycopg2.extras
import json

config = {
    "user": "postgres",
    "password": "secret",
    "host": "postgres"
}

conn = psycopg2.connect(host=config["host"], user=config["user"], password=config["password"])

def initDB():
    data = json.loads(open("challs.json", "r").read())
    curr = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    for chall in data:
        try:
            curr.execute("""
                         INSERT INTO challenges (title, prompt, place, checkPoint, flag, isStatic, points, hints, solves, visible, files, author) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                         """, (chall["title"], chall["prompt"], chall["place"], chall["checkPoint"], chall["flag"], chall["isStatic"], chall["points"], chall["hints"], chall["solves"], chall["visible"], chall["files"], chall["author"]))
        except Exception as e:
            print(f"Error in initilizing challenges: {e}")

    curr.close()
    conn.commit()

initDB()