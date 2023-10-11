import discord
from discord.ext import commands
from table2ascii import table2ascii as t2a, PresetStyle
import db

TOKEN = "MTE1OTM4NzQyODU4MzM4MzExMA.G-8Y3y.Zi9a9qlNFjycp42ccEiVdvNg3Nn4oQ-CE8RQec"

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

@bot.command(name="ping")
async def send_ping(ctx):
    if ctx.author == bot.user:
        return
    
    await ctx.send("pong")

@bot.command(name="teams")
async def send_teams(ctx):
    teams = db.getTeams()

    for i in range(0, len(teams), 10):
        msg = t2a(
            header = ["team_id", "teamname"],
            body = teams[i : min(i + 10, len(teams))],
            style = PresetStyle.thin_compact
        )

        await ctx.send(f"```\n{msg}\n```")

@bot.command(name="flags")
async def send_flags(ctx, team_id):
    flags = db.getFlags(team_id=team_id)

    for i in range(0, len(flags), 10):
        msg = t2a(
            header=["chall_id", "flag"],
            body=flags[i : min(i + 10, len(flags))],
            style = PresetStyle.thin_compact
        )
        await ctx.send(f"```\n{msg}\n```")

@bot.command(name="logs")
async def send_logs(ctx, *args):
    maxLogs = 100
    
    if len(args) > 0:
        try:
            maxLogs = int(args[0])
        except:
            pass

    logs = db.getLogs(maxLogs)
    msg = t2a(
        header=["chall_id", "team_id", "username", "flag", "ip", "time", "correct"],
        body=logs,
        style = PresetStyle.thin_compact
    )
    await ctx.send(f"```\n{msg}\n```")

bot.run(TOKEN)