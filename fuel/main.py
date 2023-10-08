import psycopg2
import datetime

conn = psycopg2.connect(host="postgres", user="postgres", password="secret")
cursor = conn.cursor()

RATE = -50
EVENT_START = datetime.datetime(2023, 10, 13, 13)

def getTeamData():
    cursor.execute("SELECT c.checkpoint, t.team_id, t.current_point FROM teams AS t, challenges AS c WHERE c.place=t.last_solved")
    return cursor.fetchall()

def decreasePoints(teams):
    for team in teams:
        if not team[0]:
            team_id = team[1]
            current_point = team[2]

            new_point = current_point + RATE

            if new_point > 0:
                cursor.execute('UPDATE teams SET current_point=%s, team_scores=(SELECT array_cat(team_scores, %s) FROM teams WHERE team_id=%s) WHERE team_id=%s', (new_point, [int((datetime.datetime.now() - EVENT_START).total_seconds()), new_point], team_id, team_id))
            
    conn.commit()


decreasePoints(getTeamData())