import argparse
import psycopg2
from psycopg2 import extras
import csv
import os

parser = argparse.ArgumentParser()
parser.add_argument('--name', type = str, required = True)
parser.add_argument('--user', type = str, required = True)
parser.add_argument('--pswd', type = str, required = True)
parser.add_argument('--host', type = str, required = True)
parser.add_argument('--port', type = str, required = True)
parser.add_argument('--ddl', type = str, required = True)
parser.add_argument('--data', type = str, required = True)
args = parser.parse_args()

with psycopg2.connect(dbname = args.name, user = args.user, password = args.pswd, host = args.host, port = args.port) as conn:
	with conn.cursor() as cur:
		with open(args.ddl, "r") as f:
			cur.execute(f.read())

		for filename in ['team.csv', 'owner.csv', 'umpire.csv', 'player.csv', 'venue.csv', 'match.csv', 'umpire_match.csv', 'player_match.csv', 'ball_by_ball.csv']:
			f = os.path.join(args.data, filename)
			if os.path.isfile(f):
				with open(f) as csvfile:
					reader = csv.reader(csvfile)
					header = next(reader)
					values_list = []
					for row in reader:
						for i in range(len(row)):
							if(row[i] == 'NULL'):
								row[i] = None
						values_list.append(tuple(row))
					query = 'INSERT INTO ' + filename[:-4] + ' (' + ', '.join(str(x) for x in header) + ') values %s' 
					extras.execute_values(cur, query, values_list)

