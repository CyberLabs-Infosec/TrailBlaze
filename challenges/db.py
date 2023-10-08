import psycopg2

conn = psycopg2.connect(host="postgres", user="postgres", password="secret")
cursor = conn.cursor()

def getFlag(chall_id, team_id, place):
    cursor.execute("""
                SELECT flag FROM challenges WHERE chall_id=%s AND place=%s;
                """, (chall_id, place, ))
    test = cursor.fetchone()
    if test is None:
        return {"success": False, "data": f"chall_id: {chall_id} and place: {place} doesn't match"}
    cursor.execute("SELECT flags->%s FROM teams WHERE team_id=%s", (str(chall_id), str(team_id)))
    d = cursor.fetchone()[0]
    return {"success": True, "data": d}


def getTeamID(uid):
    cursor.execute("""
                        SELECT team_id FROM users WHERE uid=%s;
                    """, (uid, ))
    try:
        team_id = cursor.fetchone()[0]
        return {"success": True, "data": {"team_id": team_id}}
    except Exception as e:
        return {"success": False, "data": f"Error in retrieving team_id for uid-{uid}: {e}"}