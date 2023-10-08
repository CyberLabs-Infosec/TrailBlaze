import psycopg2

conn = psycopg2.connect(host="postgres", user="postgres", password="secret")
cursor = conn.cursor()

def getFlag(team_id, place):
    cursor.execute("""
                SELECT chall_id FROM challenges WHERE place=%s;
                """, (place, ))
    test = cursor.fetchone()
    if test is None:
        return {"success": False, "data": f"chall_id doesn't exist for place: {place}"}
    chall_id = test[0]
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