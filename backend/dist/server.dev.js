"use strict";

require('dotenv').config();

var express = require("express");

var morgan = require("morgan");

var app = express();

var db = require("./db");

var cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // get all matches

app.get("/matches", function _callee(req, res) {
  var results, resultsCount;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.query("\n            SELECT match_id, team1_name AS Team1, team2_name AS Team2, venue_name AS stadium_name, city_name, result, season_year\n            FROM\n                (SELECT match_id, season_year, venue_id, win_type, win_margin, team1_name, team2_name, match_winner_name, concat(match_winner_name, ' won by ', ' ', win_margin, ' ', win_type) as result\n                FROM\n                    (SELECT match_id, season_year, venue_id, win_type, win_margin, team1_name, team2_name, team.team_name as match_winner_name\n                    FROM\n                        (SELECT match_id, season_year, venue_id, match_winner, win_type, win_margin, team1_name, team.team_name as team2_name\n                        FROM\n                            (SELECT match_id, season_year, team1, team2, venue_id, match_winner, win_type, win_margin, team_name as team1_name\n                            FROM match\n                            INNER JOIN team\n                            ON team1=team.team_id) AS t1\n                        INNER JOIN team\n                        ON team2=team.team_id) AS t2\n                    INNER JOIN team\n                    ON t2.match_winner = team.team_id) AS t3) AS t4\n            INNER JOIN venue\n            ON t4.venue_id = venue.venue_id\n            ORDER BY season_year DESC, match_id\n            LIMIT 10;\n        "));

        case 3:
          results = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(db.query("\n        SELECT COUNT(*) FROM match;\n        "));

        case 6:
          resultsCount = _context.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              matches: results.rows,
              totalResults: resultsCount.rows[0]["count"]
            }
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // get all matches

app.get("/matches/page/:page_no", function _callee2(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db.query("\n            SELECT match_id, team1_name AS Team1, team2_name AS Team2, venue_name AS stadium_name, city_name, result, season_year\n            FROM\n                (SELECT match_id, season_year, venue_id, win_type, win_margin, team1_name, team2_name, match_winner_name, concat(match_winner_name, ' won by ', ' ', win_margin, ' ', win_type) as result\n                FROM\n                    (SELECT match_id, season_year, venue_id, win_type, win_margin, team1_name, team2_name, team.team_name as match_winner_name\n                    FROM\n                        (SELECT match_id, season_year, venue_id, match_winner, win_type, win_margin, team1_name, team.team_name as team2_name\n                        FROM\n                            (SELECT match_id, season_year, team1, team2, venue_id, match_winner, win_type, win_margin, team_name as team1_name\n                            FROM match\n                            INNER JOIN team\n                            ON team1=team.team_id) AS t1\n                        INNER JOIN team\n                        ON team2=team.team_id) AS t2\n                    INNER JOIN team\n                    ON t2.match_winner = team.team_id) AS t3) AS t4\n            INNER JOIN venue\n            ON t4.venue_id = venue.venue_id\n            ORDER BY season_year DESC, match_id\n            OFFSET 10*$1\n            LIMIT 10;\n        ", [req.params.page_no]));

        case 3:
          results = _context2.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "matches": results.rows
            }
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // get Score Comaprison Graph Stats for a match

app.get("/matches/score_comparison/:id", function _callee3(req, res) {
  var inningOne, inningTwo, inningOneWickets, inningTwoWickets, first_batting_bowling, won;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.query("\n    SELECT over_id, runs, SUM(runs) over (order by over_id) as total_score\n    FROM\n        (select over_id, SUM(runs_scored+extra_runs) as runs\n        from ball_by_ball\n        where match_id = $1 and innings_no = 1\n        group by over_id\n        order by over_id) AS t1;\n    ", [req.params.id]));

        case 3:
          inningOne = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(db.query("\n    SELECT over_id, runs, SUM(runs) over (order by over_id) as total_score\n    FROM\n        (select over_id, SUM(runs_scored+extra_runs) as runs\n        from ball_by_ball\n        where match_id = $1 and innings_no = 2\n        group by over_id\n        order by over_id) AS t1;\n    ", [req.params.id]));

        case 6:
          inningTwo = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(db.query("\n    SELECT t1.over_id, COALESCE(down*3, 0) AS dotRadius\n    FROM\n        (SELECT DISTINCT over_id\n        FROM ball_by_ball\n        WHERE match_id = $1 AND innings_no=1) AS t1\n    LEFT JOIN\n        (SELECT over_id, COUNT(*) AS down\n        FROM ball_by_ball\n        WHERE match_id = $1 AND innings_no=1 AND out_type!='NULL'\n        GROUP BY over_id) AS t3\n    ON t1.over_id = t3.over_id\n    ORDER BY t1.over_id;\n    ", [req.params.id]));

        case 9:
          inningOneWickets = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(db.query("\n    SELECT t1.over_id, COALESCE(down*3, 0) AS dotRadius\n    FROM\n        (SELECT DISTINCT over_id\n        FROM ball_by_ball\n        WHERE match_id = $1 AND innings_no=2) AS t1\n    LEFT JOIN\n        (SELECT over_id, COUNT(*) AS down\n        FROM ball_by_ball\n        WHERE match_id = $1 AND innings_no=2 AND out_type!='NULL'\n        GROUP BY over_id) AS t3\n    ON t1.over_id = t3.over_id\n    ORDER BY t1.over_id;\n    ", [req.params.id]));

        case 12:
          inningTwoWickets = _context3.sent;
          _context3.next = 15;
          return regeneratorRuntime.awrap(db.query("\n        SELECT *\n        FROM\n            (SELECT first_batting, team_name as first_bowling\n            FROM team\n            INNER JOIN\n                (SELECT firstbatting, firstbowling, team_name as first_batting\n                FROM team\n                INNER JOIN\n                    (SELECT Firstbatting,\n                        CASE \n                            WHEN Firstbatting=team1 THEN team2\n                            ELSE team1\n                        END\n                        AS Firstbowling\n                    FROM\n                        (SELECT team1, team2, toss_winner, toss_name,\n                            CASE\n                                WHEN ((team1=toss_winner AND toss_name='bat') OR (team2=toss_winner AND toss_name='field')) THEN team1\n                                ELSE team2\n                            END\n                            AS Firstbatting\n                        FROM match\n                        WHERE match_id = $1) AS t1) AS t2\n                ON team.team_id = t2.firstbatting) AS t3\n            ON team.team_id = t3.firstbowling) AS t8\n        CROSS JOIN\n            (SELECT *\n            FROM\n                (SELECT *\n                FROM\n                    (SELECT COUNT(*) AS second_innings_wicket\n                    FROM ball_by_ball\n                    WHERE match_id = $1 and innings_no=2 and out_type!='NULL') AS t1\n                CROSS JOIN\n                    (SELECT SUM(extra_runs) AS innings_two_extra_runs, SUM(runs_scored+extra_runs) AS innings_two_runs\n                    FROM ball_by_ball\n                    WHERE match_id = $1 and innings_no=2) AS t2) AS t3\n            CROSS JOIN\n                (SELECT *\n                FROM\n                    (SELECT COUNT(*) AS first_innings_wicket\n                    FROM ball_by_ball\n                    WHERE match_id = $1 and innings_no=1 and out_type!='NULL') AS t1\n                CROSS JOIN\n                    (SELECT SUM(extra_runs) AS innings_one_extra_runs, SUM(runs_scored+extra_runs) AS innings_one_runs\n                    FROM ball_by_ball\n                    WHERE match_id = $1 and innings_no=1) AS t2) AS t4) AS t9;\n    ", [req.params.id]));

        case 15:
          first_batting_bowling = _context3.sent;
          _context3.next = 18;
          return regeneratorRuntime.awrap(db.query("\n    SELECT concat(team_name, ' won by ', win_margin, ' ', win_type) AS won\n    FROM\n    (SELECT team_name, win_type, win_margin\n    FROM\n        (SELECT match_winner, win_type, win_margin\n        FROM match\n        WHERE match_id = $1) AS t1\n    INNER JOIN team\n    ON t1.match_winner=team.team_id) AS t2;\n    ", [req.params.id]));

        case 18:
          won = _context3.sent;
          console.log(inningOne.rows);
          res.status(200).json({
            status: "sucess",
            results: inningOne.rows.length,
            data: {
              inningOne: inningOne.rows,
              inningTwo: inningTwo.rows,
              inningOneWickets: inningOneWickets.rows,
              inningTwoWickets: inningTwoWickets.rows,
              firstBattingBowling: first_batting_bowling.rows,
              won: won.rows
            }
          });
          _context3.next = 26;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 23]]);
}); // get match summary stats

app.get("/matches/match_summary/:id", function _callee4(req, res) {
  var summaryOne, summaryTwo, inningOneBatter, inningTwoBatter, inningOneBowler, inningTwoBowler, won, matchInfo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(db.query("\n        SELECT *\n        FROM\n        (SELECT cast(runs_scored as text) AS runType, COUNT(*)*runs_scored AS runScored\n        FROM ball_by_ball\n        WHERE match_id=$1 AND innings_no=1 AND runs_scored!=0\n        GROUP BY runs_scored\n        ORDER BY runType) AS t1\n        UNION\n        (SELECT 'Extra Runs' as runType, (SELECT SUM(extra_runs) as runs FROM ball_by_ball Where match_id = $1 AND innings_no=1) as runScored)\n        ORDER BY runType;\n        ", [req.params.id]));

        case 3:
          summaryOne = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(db.query("\n        SELECT *\n        FROM\n        (SELECT cast(runs_scored as text) AS runType, COUNT(*)*runs_scored AS runScored\n        FROM ball_by_ball\n        WHERE match_id=$1 AND innings_no=2 AND runs_scored!=0\n        GROUP BY runs_scored\n        ORDER BY runType) AS t1\n        UNION\n        (SELECT 'Extra Runs' as runType, (SELECT SUM(extra_runs) as runs FROM ball_by_ball Where match_id = $1 AND innings_no=2) as runScored)\n        ORDER BY runType;\n        ", [req.params.id]));

        case 6:
          summaryTwo = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(db.query("\n        SELECT player_name, player_id, total_runs_scored, balls_faced\n        FROM player\n        INNER JOIN\n            (SELECT striker, SUM(runs_scored) AS total_runs_scored, COUNT(*) AS balls_faced\n            FROM ball_by_ball\n            WHERE match_id = $1 AND innings_no = 1\n            GROUP BY striker) AS t0\n        ON player.player_id = t0.striker\n        ORDER BY total_runs_scored DESC, balls_faced ASC, player_name ASC\n        LIMIT 3;\n        ", [req.params.id]));

        case 9:
          inningOneBatter = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(db.query("\n        SELECT player_name, player_id, total_runs_scored, balls_faced\n        FROM player\n        INNER JOIN\n            (SELECT striker, SUM(runs_scored) AS total_runs_scored, COUNT(*) AS balls_faced\n            FROM ball_by_ball\n            WHERE match_id = $1 AND innings_no=2\n            GROUP BY striker) AS t0\n        ON player.player_id = t0.striker\n        ORDER BY total_runs_scored DESC, balls_faced ASC, player_name ASC\n        LIMIT 3;\n        ", [req.params.id]));

        case 12:
          inningTwoBatter = _context4.sent;
          _context4.next = 15;
          return regeneratorRuntime.awrap(db.query("\n        SELECT player_name, player_id, wickets_taken, runs_given\n        FROM\n            player\n        INNER JOIN\n            (SELECT t0.bowler, wickets_taken, runs_given\n            FROM\n                (SELECT bowler, COUNT(*) AS wickets_taken\n                FROM ball_by_ball\n                WHERE match_id = $1 AND innings_no=1 AND out_type!='NULL' AND out_type!='retired hurt' AND out_type!='run out'\n                GROUP BY bowler) AS t0\n            LEFT JOIN \n                (SELECT bowler, SUM(runs_scored+extra_runs) AS runs_given\n                FROM ball_by_ball\n                WHERE match_id=$1 AND innings_no=1\n                GROUP BY bowler) AS t1\n            ON t0.bowler = t1.bowler) AS t2\n        ON player.player_id = t2.bowler\n        ORDER BY wickets_taken DESC, runs_given ASC, player_name ASC\n        LIMIT 3;\n        ", [req.params.id]));

        case 15:
          inningOneBowler = _context4.sent;
          _context4.next = 18;
          return regeneratorRuntime.awrap(db.query("\n        SELECT player_name, player_id, wickets_taken, runs_given\n        FROM\n            player\n        INNER JOIN\n            (SELECT t0.bowler, wickets_taken, runs_given\n            FROM\n                (SELECT bowler, COUNT(*) AS wickets_taken\n                FROM ball_by_ball\n                WHERE match_id = $1 AND innings_no=2 AND out_type!='NULL' AND out_type!='retired hurt' AND out_type!='run out'\n                GROUP BY bowler) AS t0\n            LEFT JOIN \n                (SELECT bowler, SUM(runs_scored+extra_runs) AS runs_given\n                FROM ball_by_ball\n                WHERE match_id=$1 AND innings_no=2\n                GROUP BY bowler) AS t1\n            ON t0.bowler = t1.bowler) AS t2\n        ON player.player_id = t2.bowler\n        ORDER BY wickets_taken DESC, runs_given ASC, player_name ASC\n        LIMIT 3;\n        ", [req.params.id]));

        case 18:
          inningTwoBowler = _context4.sent;
          _context4.next = 21;
          return regeneratorRuntime.awrap(db.query("\n        SELECT concat(team_name, ' won by ', win_margin, ' ', win_type) AS won\n        FROM\n        (SELECT team_name, win_type, win_margin\n        FROM\n            (SELECT match_winner, win_type, win_margin\n            FROM match\n            WHERE match_id = $1) AS t1\n        INNER JOIN team\n        ON t1.match_winner=team.team_id) AS t2;\n        ", [req.params.id]));

        case 21:
          won = _context4.sent;
          _context4.next = 24;
          return regeneratorRuntime.awrap(db.query("\n            SELECT *\n            FROM\n                (SELECT first_batting, team_name as first_bowling\n                FROM team\n                INNER JOIN\n                    (SELECT firstbatting, firstbowling, team_name as first_batting\n                    FROM team\n                    INNER JOIN\n                        (SELECT Firstbatting,\n                            CASE \n                                WHEN Firstbatting=team1 THEN team2\n                                ELSE team1\n                            END\n                            AS Firstbowling\n                        FROM\n                            (SELECT team1, team2, toss_winner, toss_name,\n                                CASE\n                                    WHEN ((team1=toss_winner AND toss_name='bat') OR (team2=toss_winner AND toss_name='field')) THEN team1\n                                    ELSE team2\n                                END\n                                AS Firstbatting\n                            FROM match\n                            WHERE match_id = $1) AS t1) AS t2\n                    ON team.team_id = t2.firstbatting) AS t3\n                ON team.team_id = t3.firstbowling) AS t8\n            CROSS JOIN\n                (SELECT *\n                FROM\n                    (SELECT *\n                    FROM\n                        (SELECT COUNT(*) AS second_innings_wicket\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=2 and out_type!='NULL') AS t1\n                    CROSS JOIN\n                        (SELECT SUM(extra_runs) AS innings_two_extra_runs, SUM(runs_scored+extra_runs) AS innings_two_runs\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=2) AS t2) AS t3\n                CROSS JOIN\n                    (SELECT *\n                    FROM\n                        (SELECT COUNT(*) AS first_innings_wicket\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=1 and out_type!='NULL') AS t1\n                    CROSS JOIN\n                        (SELECT SUM(extra_runs) AS innings_one_extra_runs, SUM(runs_scored+extra_runs) AS innings_one_runs\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=1) AS t2) AS t4) AS t9;\n        ", [req.params.id]));

        case 24:
          matchInfo = _context4.sent;
          res.status(200).json({
            status: "sucess",
            results: summaryOne.rows.length,
            data: {
              summaryOne: summaryOne.rows,
              summaryTwo: summaryTwo.rows,
              inningOneBatter: inningOneBatter.rows,
              inningTwoBatter: inningTwoBatter.rows,
              inningOneBowler: inningOneBowler.rows,
              inningTwoBowler: inningTwoBowler.rows,
              won: won.rows,
              matchInfo: matchInfo.rows
            }
          });
          _context4.next = 31;
          break;

        case 28:
          _context4.prev = 28;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 31:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 28]]);
}); // get match info

app.get("/matches/:id", function _callee5(req, res) {
  var i1_batter, i2_batter, i1_bowler, i2_bowler, first_batting_bowling, matchInfo, umpires, teamOnePlayers, teamTwoPlayers;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(db.query("\n            SELECT player_id, player_name, runs, balls_faced, strike_rate, fours, COALESCE(sixes, 0) as sixes\n            FROM\n                (SELECT t4.player_id, t4.player_name, t4.runs, t4.balls_faced, strike_rate, COALESCE(fours, 0) AS fours\n                FROM\n                    (SELECT player_id, player_name, runs, balls_faced, strike_rate\n                    FROM player\n                    INNER JOIN\n                        (SELECT batter, runs, balls_faced, ROUND(((100.0*runs)/balls_faced), 2) AS strike_rate\n                        FROM\n                            (SELECT striker AS batter, SUM(runs_scored) AS runs, COUNT(*) AS balls_faced\n                            FROM (SELECT * FROM ball_by_ball WHERE match_id=$1 AND innings_no=1) AS t1\n                            GROUP BY striker) AS t2) AS t3\n                    ON player.player_id = t3.batter) AS t4\n                LEFT JOIN\n                    (SELECT striker as batter, count(*) as fours\n                    FROM ball_by_ball\n                    WHERE match_id = $1 AND innings_no=1 AND runs_scored = 4\n                    GROUP BY striker) AS t5\n                ON t4.player_id = t5.batter) AS t7\n            LEFT JOIN\n                (SELECT striker as batter, count(*) as sixes\n                FROM ball_by_ball\n                WHERE match_id = $1 AND innings_no=1 AND runs_scored = 6\n                GROUP BY striker) AS t6\n            ON t7.player_id = t6.batter\n            ORDER BY runs DESC;            \n          ", [req.params.id]));

        case 3:
          i1_batter = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(db.query("\n            SELECT player_id, player_name, runs, balls_faced, strike_rate, fours, COALESCE(sixes, 0) AS sixes\n            FROM\n                (SELECT t4.player_id, t4.player_name, t4.runs, t4.balls_faced, strike_rate, COALESCE(fours, 0) AS fours\n                FROM\n                    (SELECT player_id, player_name, runs, balls_faced, strike_rate\n                    FROM player\n                    INNER JOIN\n                        (SELECT batter, runs, balls_faced, ROUND(((100.0*runs)/balls_faced), 2) AS strike_rate\n                        FROM\n                            (SELECT striker AS batter, SUM(runs_scored) AS runs, COUNT(*) AS balls_faced\n                            FROM (SELECT * FROM ball_by_ball WHERE match_id=$1 AND innings_no=2) AS t1\n                            GROUP BY striker) AS t2) AS t3\n                    ON player.player_id = t3.batter) AS t4\n                LEFT JOIN\n                    (SELECT striker as batter, count(*) as fours\n                    FROM ball_by_ball\n                    WHERE match_id = $1 AND innings_no=2 AND runs_scored = 4\n                    GROUP BY striker) AS t5\n                ON t4.player_id = t5.batter) AS t7\n            LEFT JOIN\n                (SELECT striker as batter, count(*) as sixes\n                FROM ball_by_ball\n                WHERE match_id = $1 AND innings_no=2 AND runs_scored = 6\n                GROUP BY striker) AS t6\n            ON t7.player_id = t6.batter\n            ORDER BY runs DESC;\n            ", [req.params.id]));

        case 6:
          i2_batter = _context5.sent;
          _context5.next = 9;
          return regeneratorRuntime.awrap(db.query("\n            SELECT player.player_id, player.player_name, balls_bowled, runs_given, COALESCE(wickets, 0) as wickets\n            FROM player\n            INNER JOIN\n                (SELECT t1.bowler, balls_bowled, runs_given, COALESCE(wickets, 0) as wickets\n                FROM\n                    (SELECT bowler, COUNT(*) AS balls_bowled, SUM(runs_scored) AS runs_given\n                    FROM ball_by_ball\n                    WHERE match_id = $1 AND innings_no=1\n                    GROUP BY bowler) AS t1\n                LEFT JOIN\n                    (SELECT bowler, COUNT(*) AS wickets\n                    FROM ball_by_ball\n                    WHERE match_id = $1 AND innings_no=1 AND out_type!='NULL' AND out_type!='retired hurt' AND out_type!='run out'\n                    GROUP BY bowler) AS t2\n                ON t1.bowler = t2.bowler) AS t4\n            ON player.player_id=t4.bowler;\n            ", [req.params.id]));

        case 9:
          i1_bowler = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(db.query("\n            SELECT player.player_id, player.player_name, balls_bowled, runs_given, COALESCE(wickets, 0) as wickets\n            FROM player\n            INNER JOIN\n                (SELECT t1.bowler, balls_bowled, runs_given, COALESCE(wickets, 0) as wickets\n                FROM\n                    (SELECT bowler, COUNT(*) AS balls_bowled, SUM(runs_scored) AS runs_given\n                    FROM ball_by_ball\n                    WHERE match_id = $1 AND innings_no=2\n                    GROUP BY bowler) AS t1\n                LEFT JOIN\n                    (SELECT bowler, COUNT(*) AS wickets\n                    FROM ball_by_ball\n                    WHERE match_id = $1 AND innings_no=2 AND out_type!='NULL' AND out_type!='retired hurt' AND out_type!='run out'\n                    GROUP BY bowler) AS t2\n                ON t1.bowler = t2.bowler) AS t4\n            ON player.player_id=t4.bowler;\n            ", [req.params.id]));

        case 12:
          i2_bowler = _context5.sent;
          _context5.next = 15;
          return regeneratorRuntime.awrap(db.query("\n            SELECT *\n            FROM\n                (SELECT first_batting, team_name as first_bowling\n                FROM team\n                INNER JOIN\n                    (SELECT firstbatting, firstbowling, team_name as first_batting\n                    FROM team\n                    INNER JOIN\n                        (SELECT Firstbatting,\n                            CASE \n                                WHEN Firstbatting=team1 THEN team2\n                                ELSE team1\n                            END\n                            AS Firstbowling\n                        FROM\n                            (SELECT team1, team2, toss_winner, toss_name,\n                                CASE\n                                    WHEN ((team1=toss_winner AND toss_name='bat') OR (team2=toss_winner AND toss_name='field')) THEN team1\n                                    ELSE team2\n                                END\n                                AS Firstbatting\n                            FROM match\n                            WHERE match_id = $1) AS t1) AS t2\n                    ON team.team_id = t2.firstbatting) AS t3\n                ON team.team_id = t3.firstbowling) AS t8\n            CROSS JOIN\n                (SELECT *\n                FROM\n                    (SELECT *\n                    FROM\n                        (SELECT COUNT(*) AS second_innings_wicket\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=2 and out_type!='NULL') AS t1\n                    CROSS JOIN\n                        (SELECT SUM(extra_runs) AS innings_two_extra_runs, SUM(runs_scored+extra_runs) AS innings_two_runs\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=2) AS t2) AS t3\n                CROSS JOIN\n                    (SELECT *\n                    FROM\n                        (SELECT COUNT(*) AS first_innings_wicket\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=1 and out_type!='NULL') AS t1\n                    CROSS JOIN\n                        (SELECT SUM(extra_runs) AS innings_one_extra_runs, SUM(runs_scored+extra_runs) AS innings_one_runs\n                        FROM ball_by_ball\n                        WHERE match_id = $1 and innings_no=1) AS t2) AS t4) AS t9;\n        ", [req.params.id]));

        case 15:
          first_batting_bowling = _context5.sent;
          _context5.next = 18;
          return regeneratorRuntime.awrap(db.query("\n        SELECT match_id, season_year, teamOne, teamTwo, venue_name, city_name, country_name, concat(toss_winner_team, ' won the toss and opt to ', toss_name, ' first')as toss\n        FROM\n            (SELECT match_id, season_year, toss_name, teamOne, teamTwo, toss_winner_team, venue_name, city_name, country_name\n            FROM\n                (SELECT match_id, season_year, venue_id, toss_name, toss_winner, teamOne, teamTwo, team_name as toss_winner_team\n                FROM\n                    (SELECT match_id, season_year, venue_id, toss_name, toss_winner, teamOne, team_name as teamTwo\n                    FROM\n                        (SELECT match_id, season_year, team1, team2, venue_id, toss_name, toss_winner, team.team_name as teamOne\n                        FROM match, team\n                        WHERE match_id = $1 AND team1=team.team_id) AS t1\n                    INNER JOIN team\n                    ON team.team_id = team2) AS t2\n                INNER JOIN team\n                ON toss_winner=team_id) AS t3\n            INNER JOIN venue\n            ON t3.venue_id = venue.venue_id) AS t4;\n        ", [req.params.id]));

        case 18:
          matchInfo = _context5.sent;
          _context5.next = 21;
          return regeneratorRuntime.awrap(db.query("\n        SELECT umpire.umpire_id, umpire_name, role_desc\n        FROM\n            (SELECT umpire_id, role_desc FROM umpire_match WHERE match_id = $1) AS t1\n        INNER JOIN umpire\n        ON t1.umpire_id = umpire.umpire_id;\n        ", [req.params.id]));

        case 21:
          umpires = _context5.sent;
          _context5.next = 24;
          return regeneratorRuntime.awrap(db.query("\n        SELECT player.player_id, player_name, role_desc\n        FROM\n            (SELECT player_id, role_desc FROM player_match WHERE match_id = $1 AND team_id = (SELECT team1 FROM match WHERE match_id=$1)) AS t1\n        INNER JOIN player\n        ON player.player_id=t1.player_id;\n        ", [req.params.id]));

        case 24:
          teamOnePlayers = _context5.sent;
          _context5.next = 27;
          return regeneratorRuntime.awrap(db.query("\n        SELECT player.player_id, player_name, role_desc\n        FROM\n            (SELECT player_id, role_desc FROM player_match WHERE match_id = $1 AND team_id = (SELECT team2 FROM match WHERE match_id=$1)) AS t1\n        INNER JOIN player\n        ON player.player_id=t1.player_id;\n        ", [req.params.id]));

        case 27:
          teamTwoPlayers = _context5.sent;
          res.status(200).json({
            status: "sucess",
            results: i1_batter.rows.length,
            ///////////////////  see what to set this to /////////
            data: {
              inningOneBatter: i1_batter.rows,
              inningTwoBatter: i2_batter.rows,
              inningOneBowler: i1_bowler.rows,
              inningTwoBowler: i2_bowler.rows,
              firstBattingBowling: first_batting_bowling.rows,
              matchInfo: matchInfo.rows,
              umpires: umpires.rows,
              teamOnePlayers: teamOnePlayers.rows,
              teamTwoPlayers: teamTwoPlayers.rows
            }
          });
          _context5.next = 34;
          break;

        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 34:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 31]]);
}); // get points table

app.get("/pointstable/:year", function _callee6(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(db.query("\n        SELECT tb1.team_id, tb1.team_name, match_played, won, lost, tied, nrr, pts\n        FROM\n            (SELECT team_id, team_name, match_played, won, lost, (2*won) AS pts, (match_played-won-lost) AS tied\n            FROM\n                (SELECT t3.team_id, t3.team_name, t3.match_played, t3.won, COALESCE(lost, 0) AS lost\n                FROM\n                    (SELECT t1.team_id, t1.team_name, match_played, COALESCE(won, 0) AS won\n                    FROM\n                        (SELECT team.team_id, team_name, COUNT(*) AS match_played\n                        FROM team, match\n                        WHERE season_year = $1 AND (team_id = team1 OR team_id = team2)\n                        GROUP BY team.team_id, team.team_name) AS t1\n                    LEFT JOIN\n                        (SELECT match_winner AS team_id, COUNT(*) AS won\n                        FROM match\n                        WHERE season_year= $1\n                        GROUP BY match_winner) AS t2\n                    ON t1.team_id = t2.team_id) AS t3\n                LEFT JOIN\n                    (SELECT team.team_id, COUNT(*) AS lost\n                    FROM team\n                    INNER JOIN\n                        (SELECT *\n                        FROM match\n                        WHERE season_year=$1) AS t0\n                    ON (team.team_id = t0.team1 AND t0.team2 = t0.match_winner) OR (team.team_id = t0.team2 AND t0.team1 = t0.match_winner)\n                    GROUP BY team.team_id) AS t4\n                ON t3.team_id = t4.team_id) AS t5) AS tb1\n        INNER JOIN\n        (SELECT team_id, team_name, ROUND((((1.0*total_runs_scored)/total_overs_faced) - ((1.0*total_runs_scored_against)/total_overs_faced_against)),2) AS NRR\n        FROM\n            (SELECT t6.team_id, t6.team_name, total_runs_scored, total_overs_faced, total_runs_scored_against, total_overs_faced_against\n            FROM\n                (SELECT team_id, team_name, SUM(runs_scored) AS total_runs_scored, SUM(overs_faced) AS total_overs_faced\n                FROM(\n                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored+extra_runs) AS runs_scored, MAX(over_id) AS overs_faced\n                    FROM\n                        (SELECT *\n                        FROM\n                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name\n                            FROM team, match\n                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1\n                            ORDER BY team.team_id) AS t1\n                        WHERE (toss_winner=team_id AND toss_name='bat') OR (toss_winner!=team_id AND toss_name='field')) AS t2\n                    INNER JOIN ball_by_ball\n                    ON t2.match_id = ball_by_ball.match_id\n                    WHERE innings_no=1\n                    GROUP BY t2.team_id, t2.team_name, t2.match_id)\n                    UNION\n                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored+extra_runs) AS runs_scored, MAX(over_id) AS overs_faced\n                    FROM\n                        (SELECT *\n                        FROM\n                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name\n                            FROM team, match\n                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1\n                            ORDER BY team.team_id) AS t1\n                        WHERE (toss_winner=team_id AND toss_name='field') OR (toss_winner!=team_id AND toss_name='bat')) AS t2\n                    INNER JOIN ball_by_ball\n                    ON t2.match_id = ball_by_ball.match_id\n                    WHERE innings_no=2\n                    GROUP BY t2.team_id, t2.team_name, t2.match_id)) AS t3\n                GROUP BY team_id, team_name) AS t6\n            INNER JOIN\n                (SELECT team_id, team_name, SUM(runs_scored_against) AS total_runs_scored_against, SUM(overs_faced_against) AS total_overs_faced_against\n                FROM(\n                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored+extra_runs) AS runs_scored_against, MAX(over_id) AS overs_faced_against\n                    FROM\n                        (SELECT *\n                        FROM\n                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name\n                            FROM team, match\n                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1\n                            ORDER BY team.team_id) AS t1\n                        WHERE (toss_winner=team_id AND toss_name='bat') OR (toss_winner!=team_id AND toss_name='field')) AS t2\n                    INNER JOIN ball_by_ball\n                    ON t2.match_id = ball_by_ball.match_id\n                    WHERE innings_no=2\n                    GROUP BY t2.team_id, t2.team_name, t2.match_id)\n                    UNION\n                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored+extra_runs) AS runs_scored_against, MAX(over_id) AS overs_faced_against\n                    FROM\n                        (SELECT *\n                        FROM\n                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name\n                            FROM team, match\n                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1\n                            ORDER BY team.team_id) AS t1\n                        WHERE (toss_winner=team_id AND toss_name='field') OR (toss_winner!=team_id AND toss_name='bat')) AS t2\n                    INNER JOIN ball_by_ball\n                    ON t2.match_id = ball_by_ball.match_id\n                    WHERE innings_no=1\n                    GROUP BY t2.team_id, t2.team_name, t2.match_id)) AS t3\n                GROUP BY team_id, team_name) AS t7\n            ON t6.team_id=t7.team_id) AS t8) AS tb2\n        ON tb1.team_id = tb2.team_id\n        ORDER BY pts DESC, nrr DESC;\n    ", [req.params.year]));

        case 3:
          results = _context6.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              results: results.rows
            }
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // get all venue names

app.get("/venues", function _callee7(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(db.query("select * from venue"));

        case 3:
          results = _context7.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "venues": results.rows
            }
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // get a particular venue basic info

app.get("/venue/info/:id", function _callee8(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(db.query("select venue.venue_id, venue_name, city_name, country_name, capacity, matches_played, max(total_runs) as max_total, min(total_runs) as min_total, max_runs_chased\n        from\n        venue, (select venue_id, A.match_id, total_runs\n                from \n                    (select match_id, sum(runs_scored + extra_runs) as total_runs \n                    from \n                    ball_by_ball group by match_id) as A, match where A.match_id = match.match_id) as B, \n                (select cast($1 as int) as venue_id, coalesce(max(runs_chased),0) as max_runs_chased from (select max(venue_id) as venue_id, A.match_id, max(total_runs) as runs_chased \n                from \n                    (select match_id , sum(runs_scored + extra_runs) as total_runs \n                    from ball_by_ball where innings_no = 1 group by match_id) as A, match \n                where A.match_id = match.match_id and ((toss_winner != match_winner and toss_name = 'bat') or  (toss_winner = match_winner and toss_name = 'field')) group by A.match_id) as F where venue_id = $1) as C, \n                (select count(match_id) as matches_played, venue.venue_id \n                from\n                venue, match where venue.venue_id = match.venue_id group by venue.venue_id) as D \t\t\t\n        where \n        venue.venue_id = D.venue_id and venue.venue_id = B.venue_id and venue.venue_id = C.venue_id and venue.venue_id = $1 group by (venue.venue_id, venue_name, city_name, country_name, capacity, matches_played, max_runs_chased);", [req.params.id]));

        case 3:
          results = _context8.sent;

          if (!(results.rows.length == 0)) {
            _context8.next = 8;
            break;
          }

          _context8.next = 7;
          return regeneratorRuntime.awrap(db.query("select venue.venue_id, venue_name, city_name, country_name, capacity, '0' as matches_played, '0' as max_total, '0' as min_total, '0' as max_runs_chased\n            from\n            venue where venue_id = $1;", [req.params.id]));

        case 7:
          results = _context8.sent;

        case 8:
          console.log(results);
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "venue": results.rows[0]
            }
          });
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // get match outline for a venue_id

app.get("/venue/outline/:id", function _callee9(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(db.query("select venue_id, SUM(CASE WHEN (toss_winner = match_winner and toss_name = 'bat') or (toss_winner != match_winner and toss_name = 'field') THEN 1 ELSE 0 END) as bat_first, SUM(CASE WHEN (toss_winner = match_winner and toss_name = 'field') or (toss_winner != match_winner and toss_name = 'bat') THEN 1 ELSE 0 END) as bat_second\n        from\n        match\n        where venue_id = $1 group by venue_id;", [req.params.id]));

        case 3:
          results = _context9.sent;

          if (!(results.rows.length == 0)) {
            _context9.next = 8;
            break;
          }

          _context9.next = 7;
          return regeneratorRuntime.awrap(db.query("select $1 as venue_id, '0' as bat_first, '0' as bat_second;", [req.params.id]));

        case 7:
          results = _context9.sent;

        case 8:
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "venue": results.rows[0]
            }
          });
          _context9.next = 14;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // get average first inning score for a venue_id

app.get("/venue/inning/:id", function _callee10(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(db.query("select season_year, venue.venue_id, venue_name, avg(first_inning_score) as avg_score\n        from \n            (select match_id, sum(runs_scored + extra_runs) as first_inning_score \n            from ball_by_ball \n            where innings_no = 1 group by match_id) as A, match, venue \n        where match.match_id = A.match_id and venue.venue_id = match.venue_id and venue.venue_id = $1 \n        group by(venue.venue_id, season_year);", [req.params.id]));

        case 3:
          results = _context10.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "venue": results.rows
            }
          });
          _context10.next = 10;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // adding a venue

app.post("/venues", function _callee11(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          console.log(req.body);
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(db.query("Insert into venue(venue_name, city_name, country_name, capacity) values($1, $2, $3, $4) returning *", [req.body.venue_name, req.body.city_name, req.body.country_name, req.body.capacity]));

        case 4:
          results = _context11.sent;
          res.status(201).json({
            status: "sucess",
            data: {
              "venue": results.rows
            }
          });
          _context11.next = 11;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](1);
          console.log(_context11.t0);

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // get basic info of player  

app.get("/players/info/:id", function _callee12(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(db.query("select * from player where player_id = $1;", [req.params.id]));

        case 3:
          results = _context12.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "player": results.rows[0]
            }
          });
          _context12.next = 10;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // get player batting statistics

app.get("/players/bat_stat/:id", function _callee13(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(db.query("select A.player_id, matches_played, total_runs, fours, sixes, fifties, HS, round(strike_rate, 2) as strike_rate, round(average, 2) as average\n        from \n            (SELECT cast($1 as int) as player_id, count(distinct(match_id)) as matches_played FROM ball_by_ball WHERE striker = $1 or non_striker = $1) as A, \n            (select striker as player_id, sum(runs_scored) as total_runs, SUM(CASE WHEN runs_scored = 4 THEN 4 ELSE 0 END) as fours, SUM(CASE WHEN runs_scored = 6 THEN 6 ELSE 0 END) as sixes \n            from\n            ball_by_ball group by striker) as B, \n            (select striker as player_id, SUM(CASE WHEN runs_per_match >= 50 and runs_per_match < 100 THEN 1 ELSE 0 END) as fifties, max(runs_per_match) as HS, sum(runs_per_match)*1.0/sum(balls_faced) * 100.0 as strike_rate \n            from \n                (select match_id, striker, Coalesce(sum(runs_scored), 0) as runs_per_match, count(runs_scored) as balls_faced \n                from\n                ball_by_ball group by (match_id, striker)) as A\n            group by player_id) as C, \n            (select striker as player_id, MAX(A)*1.0/SUM(CASE WHEN B = 0 THEN 1 ELSE B END) as average\n            from\n                (select striker, sum(runs_scored) as A, SUM(CASE WHEN out_type is not null THEN 1 ELSE 0 END) as B \n                from\n                ball_by_ball\n                group by striker) as C\n            group by striker) as D\n        where A.player_id = B.player_id and B.player_id = C.player_id and C.player_id = D.player_id and A.player_id = $1;", [req.params.id]));

        case 3:
          results = _context13.sent;

          if (!(results.rows.length == 0)) {
            _context13.next = 8;
            break;
          }

          _context13.next = 7;
          return regeneratorRuntime.awrap(db.query("select $1 as player_id, 0 as matches_played, 0 as total_runs, 0 as fours, 0 as sixes, 0 as fifties, 0 as HS, 0 as strike_rate, 0 as average;", [req.params.id]));

        case 7:
          results = _context13.sent;

        case 8:
          console.log(results);
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "player": results.rows[0]
            }
          });
          _context13.next = 15;
          break;

        case 12:
          _context13.prev = 12;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);

        case 15:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // batting statistics graph 

app.get("/players/bat_stat_graph/:id", function _callee14(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(db.query("select striker as player_id, match_id, sum(runs_scored) as runs_per_match from ball_by_ball where striker = $1 group by (striker, match_id) order by striker asc, match_id asc;", [req.params.id]));

        case 3:
          results = _context14.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "player": results.rows
            }
          });
          _context14.next = 10;
          break;

        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);

        case 10:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // bowling statistics  

app.get("/players/bowl_stat/:id", function _callee15(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(db.query("select A.bowler as player_id, total_matches, runs, balls, overs, wickets, round(economy, 2) as economy, five_wickets\n        from \n            (select bowler, count(distinct match_id) as total_matches, sum(runs_scored + extra_runs) as runs, Count(*) as balls, count(distinct(match_id, innings_no, over_id)) as overs, SUM(CASE WHEN out_type is not null and out_type != 'retired hurt' and out_type != 'run out' THEN 1 ELSE 0 END) as wickets, sum(runs_scored + extra_runs)*1.0/count(distinct(match_id, innings_no, over_id)) as economy\n            from \n            ball_by_ball \n            group by bowler) as A, \n            (select bowler, SUM(CASE WHEN wickets_per_match >= 5 THEN 1 ELSE 0 END) as five_wickets \n            from \n                (select match_id, bowler,SUM(CASE WHEN out_type is not null and out_type != 'retired hurt' and out_type != 'run out' THEN 1 ELSE 0 END) as wickets_per_match \n                from \n                ball_by_ball \n                group by (match_id, bowler)) as A \n            group by bowler) as B \n        where A.bowler = B.bowler and A.bowler = $1;", [req.params.id]));

        case 3:
          results = _context15.sent;

          if (!(results.rows.length == 0)) {
            _context15.next = 8;
            break;
          }

          _context15.next = 7;
          return regeneratorRuntime.awrap(db.query("select $1 as player_id, 0 as totaL_matches, 0 as runs, 0 as balls, 0 as overs, 0 as wickets, 0 as economy, 0 as five_wickets;", [req.params.id]));

        case 7:
          results = _context15.sent;

        case 8:
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "player": results.rows[0]
            }
          });
          _context15.next = 14;
          break;

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // bowling statistics graph 

app.get("/players/bowl_stat_graph/:id", function _callee16(req, res) {
  var results;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(db.query("select match_id, bowler as player_id, sum(runs_scored + extra_runs) as runs_scored, SUM(CASE WHEN out_type is not null and out_type != 'retired hurt' and out_type != 'run out' THEN 1 ELSE 0 END) as wickets from ball_by_ball where bowler = $1 group by (match_id, bowler) order by bowler, match_id;", [req.params.id]));

        case 3:
          results = _context16.sent;
          res.status(200).json({
            status: "sucess",
            results: results.rows.length,
            data: {
              "player": results.rows
            }
          });
          _context16.next = 10;
          break;

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);

        case 10:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("The server is up and listening on port ".concat(port));
});