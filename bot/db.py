import psycopg2
# from psycopg2.extras import RealDictCursor

conn = psycopg2.connect(host="postgres", user="postgres", password="secret")
cursor = conn.cursor()

def getTeams():
    cursor.execute("SELECT team_id, teamname FROM teams")
    return cursor.fetchall()

def getFlags(team_id):
    cursor.execute("SELECT flags FROM teams WHERE team_id=%s", str(team_id))
    d = cursor.fetchone()[0]
    return list(map(lambda x: [x, d[x]], d))

def getLogs(max):
    cursor.execute("SELECT chall_id, team_id, username, flag, ip, subtime, correct FROM sublogs")
    return cursor.fetchall()[-max:]