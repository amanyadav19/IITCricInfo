require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// get all matches
app.get("/matches", async (req, res) => {
    try{
        const results = await db.query("SELECT * FROM match");
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "matches": results.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
    
});

// get Score Comaprison Graph Stats for a match
app.get("/matches/score_comparison/:id", async (req, res) => {
  try {
    const inningOne = await db.query(
      `
        select over_id, SUM(runs_scored+extra_runs) as runs
        from ball_by_ball
        where match_id = $1 and innings_no = 1
        group by over_id
        order by over_id;    
    `,
      [req.params.id]
    );

    const inningTwo = await db.query(
      `
        select over_id, SUM(runs_scored+extra_runs) as runs
        from ball_by_ball
        where match_id = $1 and innings_no = 2
        group by over_id
        order by over_id;    
    `,
      [req.params.id]
    );

    console.log(inningOne.rows);
    res.status(200).json({
      status: "sucess",
      results: inningOne.rows.length,
      data: {
        inningOne: inningOne.rows,
        inningTwo: inningTwo.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get match summary stats
app.get("/matches/match_summary/:id", async (req, res) => {
    try{
        const summaryOne = await db.query(
          `
            SELECT runs_scored AS runType, COUNT(*)*runs_scored AS runScored
            FROM ball_by_ball
            WHERE match_id=$1 AND innings_no=1 AND runs_scored!=0
            GROUP BY runs_scored
            ORDER BY runType;
        `,
          [req.params.id]
        );

        const summaryTwo = await db.query(
          `
            SELECT runs_scored AS runType, COUNT(*)*runs_scored AS runScored
            FROM ball_by_ball
            WHERE match_id=$1 AND innings_no=2 AND runs_scored!=0
            GROUP BY runs_scored
            ORDER BY runType;
        `,
          [req.params.id]
        );

        const extraRunsOne = await db.query(
          `
            SELECT SUM(extra_runs) as runs
            FROM ball_by_ball
            Where match_id = $1 AND innings_no=1;
        `,
          [req.params.id]
        );

        const extraRunsTwo = await db.query(
          `
            SELECT SUM(extra_runs) as runs
            FROM ball_by_ball
            Where match_id = $1 AND innings_no=2;
        `,
          [req.params.id]
        );

        res.status(200).json({
          status: "sucess",
          results: summaryOne.rows.length,
          data: {
            summaryOne: summaryOne.rows,
            summaryTwo: summaryTwo.rows,
            extraRunsOne: extraRunsOne.rows,
            extraRunsTwo: extraRunsTwo.rows,
          },
        });
    }
    catch(err) {
        console.log(err);
    }
    
});


// get match info
app.get("/matches/:id", async (req, res) => {
    try{
        const i1_batter = await db.query(
          `SELECT player_id, player_name, runs, balls_faced, strike_rate
            FROM player
            INNER JOIN
            (SELECT batter, runs, balls_faced, ROUND(((100.0*runs)/balls_faced), 2) AS strike_rate
            FROM
            (SELECT striker AS batter, SUM(runs_scored) AS runs, COUNT(*) AS balls_faced
            FROM (SELECT * FROM ball_by_ball WHERE match_id=$1 AND innings_no=1) AS t1
            GROUP BY striker) AS t2) AS t3
            ON player.player_id = t3.batter;`,
            [req.params.id]
        );
        const i2_batter = await db.query(
          `SELECT player_id, player_name, runs, balls_faced, strike_rate
            FROM player
            INNER JOIN
            (SELECT batter, runs, balls_faced, ROUND(((100.0*runs)/balls_faced), 2) AS strike_rate
            FROM
            (SELECT striker AS batter, SUM(runs_scored) AS runs, COUNT(*) AS balls_faced
            FROM (SELECT * FROM ball_by_ball WHERE match_id=$1 AND innings_no=2) AS t1
            GROUP BY striker) AS t2) AS t3
            ON player.player_id = t3.batter;`,
          [req.params.id]
        );

        const i1_bowler = await db.query(
          `SELECT bowler, COUNT(*) AS balls_bowled, SUM(runs_scored+extra_runs) AS runs_given
            FROM ball_by_ball
            WHERE match_id = $1 AND innings_no=1
            GROUP BY bowler;`,
          [req.params.id]
        );

        const i2_bowler = await db.query(
          `SELECT bowler, COUNT(*) AS balls_bowled, SUM(runs_scored+extra_runs) AS runs_given
            FROM ball_by_ball
            WHERE match_id = $1 AND innings_no=2
            GROUP BY bowler;`,
          [req.params.id]
        );

        res.status(200).json({
            status:"sucess",
            results: i1_batter.rows.length,  ///////////////////  see what to set this to /////////
            data: {
                "inningOneBatter": i1_batter.rows,
                "inningTwoBatter": i2_batter.rows,
                "inningOneBowler": i1_bowler.rows,
                "inningTwoBowler": i2_bowler.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
    
});


// get points table
app.get("/pointstable/:year", async (req, res) => {
  try {
    const results = await db.query(
      `
        SELECT tb1.team_id, tb1.team_name, match_played, won, lost, tied, nrr, pts
        FROM
            (SELECT team_id, team_name, match_played, won, lost, (2*won) AS pts, (match_played-won-lost) AS tied
            FROM
                (SELECT t3.team_id, t3.team_name, t3.match_played, t3.won, COALESCE(lost, 0) AS lost
                FROM
                    (SELECT t1.team_id, t1.team_name, match_played, COALESCE(won, 0) AS won
                    FROM
                        (SELECT team.team_id, team_name, COUNT(*) AS match_played
                        FROM team, match
                        WHERE season_year = $1 AND (team_id = team1 OR team_id = team2)
                        GROUP BY team.team_id, team.team_name) AS t1
                    LEFT JOIN
                        (SELECT match_winner AS team_id, COUNT(*) AS won
                        FROM match
                        WHERE season_year=$1
                        GROUP BY match_winner) AS t2
                    ON t1.team_id = t2.team_id) AS t3
                LEFT JOIN
                    (SELECT team.team_id, COUNT(*) AS lost
                    FROM team
                    INNER JOIN
                        (SELECT *
                        FROM match
                        WHERE season_year=$1) AS t0
                    ON (team.team_id = t0.team1 AND t0.team2 = t0.match_winner) OR (team.team_id = t0.team2 AND t0.team1 = t0.match_winner)
                    GROUP BY team.team_id) AS t4
                ON t3.team_id = t4.team_id) AS t5) AS tb1
        INNER JOIN
        (SELECT team_id, team_name, ROUND((((1.0*total_runs_scored)/total_overs_faced) - ((1.0*total_runs_scored_against)/total_overs_faced_against)),2) AS NRR
        FROM
            (SELECT t6.team_id, t6.team_name, total_runs_scored, total_overs_faced, total_runs_scored_against, total_overs_faced_against
            FROM
                (SELECT team_id, team_name, SUM(runs_scored) AS total_runs_scored, SUM(overs_faced) AS total_overs_faced
                FROM(
                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored) AS runs_scored, MAX(over_id) AS overs_faced
                    FROM
                        (SELECT *
                        FROM
                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name
                            FROM team, match
                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1
                            ORDER BY team.team_id) AS t1
                        WHERE (toss_winner=team_id AND toss_name='bat') OR (toss_winner!=team_id AND toss_name='field')) AS t2
                    INNER JOIN ball_by_ball
                    ON t2.match_id = ball_by_ball.match_id
                    WHERE innings_no=1
                    GROUP BY t2.team_id, t2.team_name, t2.match_id)
                    UNION
                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored) AS runs_scored, MAX(over_id) AS overs_faced
                    FROM
                        (SELECT *
                        FROM
                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name
                            FROM team, match
                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1
                            ORDER BY team.team_id) AS t1
                        WHERE (toss_winner=team_id AND toss_name='field') OR (toss_winner!=team_id AND toss_name='bat')) AS t2
                    INNER JOIN ball_by_ball
                    ON t2.match_id = ball_by_ball.match_id
                    WHERE innings_no=2
                    GROUP BY t2.team_id, t2.team_name, t2.match_id)) AS t3
                GROUP BY team_id, team_name) AS t6
            INNER JOIN
                (SELECT team_id, team_name, SUM(runs_scored_against) AS total_runs_scored_against, SUM(overs_faced_against) AS total_overs_faced_against
                FROM(
                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored) AS runs_scored_against, MAX(over_id) AS overs_faced_against
                    FROM
                        (SELECT *
                        FROM
                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name
                            FROM team, match
                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1
                            ORDER BY team.team_id) AS t1
                        WHERE (toss_winner=team_id AND toss_name='bat') OR (toss_winner!=team_id AND toss_name='field')) AS t2
                    INNER JOIN ball_by_ball
                    ON t2.match_id = ball_by_ball.match_id
                    WHERE innings_no=2
                    GROUP BY t2.team_id, t2.team_name, t2.match_id)
                    UNION
                    (SELECT t2.team_id, t2.team_name, t2.match_id, SUM(runs_scored) AS runs_scored_against, MAX(over_id) AS overs_faced_against
                    FROM
                        (SELECT *
                        FROM
                            (SELECT team.team_id, team.team_name, match_id, team1, team2, toss_winner, toss_name
                            FROM team, match
                            WHERE (team.team_id = team1 or team.team_id = team2) AND season_year=$1
                            ORDER BY team.team_id) AS t1
                        WHERE (toss_winner=team_id AND toss_name='field') OR (toss_winner!=team_id AND toss_name='bat')) AS t2
                    INNER JOIN ball_by_ball
                    ON t2.match_id = ball_by_ball.match_id
                    WHERE innings_no=1
                    GROUP BY t2.team_id, t2.team_name, t2.match_id)) AS t3
                GROUP BY team_id, team_name) AS t7
            ON t6.team_id=t7.team_id) AS t8) AS tb2
        ON tb1.team_id = tb2.team_id
        ORDER BY pts DESC, nrr DESC;
    `,
      [req.params.year]
    );
    res.status(200).json({
      status: "sucess",
      results: results.rows.length,
      data: {
        results: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});


// get all venue names
app.get("/venues", async (req, res) => {
    try{
        const results = await db.query("select * from venue");
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "venues": results.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
    
});

// get a particular venue basic info
app.get("/venue/info/:id", async (req, res) => {
    try{
        const results = await db.query("select venue.venue_id, venue_name, city_name, country_name, capacity, matches_played, max(total_runs) as max_total, min(total_runs) as min_total, max(runs_chased) as max_runs_chased from venue, (select venue_id, A.match_id, total_runs from (select match_id, sum(runs_scored + extra_runs) as total_runs from ball_by_ball group by match_id) as A, match where A.match_id = match.match_id) as B, (select max(venue_id) as venue_id, A.match_id, max(total_runs) as runs_chased from (select match_id, innings_no, sum(runs_scored + extra_runs) as total_runs from ball_by_ball group by (match_id, innings_no)) as A, match where A.match_id = match.match_id group by A.match_id) as C, (select count(match_id) as matches_played, venue.venue_id from venue, match where venue.venue_id = match.venue_id group by venue.venue_id) as D where venue.venue_id = D.venue_id and venue.venue_id = B.venue_id and venue.venue_id = C.venue_id and venue.venue_id = $1 group by (venue.venue_id, venue_name, city_name, country_name, capacity, matches_played);", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "venue": results.rows[0],
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// get match outline for a venue_id
app.get("/venue/outline/:id", async (req, res) => {
    try{
        const results = await db.query("select venue_id, SUM(CASE WHEN (toss_winner = match_winner and toss_name = 'bat') or (toss_winner != match_winner and toss_name = 'field') THEN 1 ELSE 0 END) as bat_first, SUM(CASE WHEN (toss_winner = match_winner and toss_name = 'field') or (toss_winner != match_winner and toss_name = 'bat') THEN 1 ELSE 0 END) as bat_second from match where venue_id = $1 group by venue_id;", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "venue": results.rows[0],
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// get average first inning score for a venue_id
app.get("/venue/inning/:id", async (req, res) => {
    try{
        const results = await db.query("select season_year, venue.venue_id, venue_name, avg(first_inning_score) as avg_score from (select match_id, sum(runs_scored + extra_runs) as first_inning_score from ball_by_ball where innings_no = 1 group by match_id) as A, match, venue where match.match_id = A.match_id and venue.venue_id = match.venue_id and venue.venue_id = $1 group by(venue.venue_id, season_year);", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "venue": results.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});


// adding a venue
app.post("/venues", async (req, res) => {
    console.log(req.body);
    try{
        const results = await db.query("Insert into venue(venue_name, city_name, country_name, capacity) values($1, $2, $3, $4) returning *", [req.body.venue_name, req.body.city_name, req.body.country_name, req.body.capacity]);
        console.log(results);
        res.status(201).json({
            status:"sucess",
            data: {
                "venue": results.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// get basic info of player  
app.get("/players/info/:id", async (req, res) => {
    try{
        const results = await db.query("select * from player where player_id = $1;", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "player": results.rows[0],
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// get player batting statistics
app.get("/players/bat_stat/:id", async (req, res) => {
    try{
        const results = await db.query("select A.player_id, matches_played, total_runs, fours, sixes, fifties, HS, strike_rate, average from (select player_id, count(match_id) as matches_played from player_match group by player_id) as A, (select striker as player_id, sum(runs_scored) as total_runs, SUM(CASE WHEN runs_scored = 4 THEN 4 ELSE 0 END) as fours, SUM(CASE WHEN runs_scored = 6 THEN 6 ELSE 0 END) as sixes from ball_by_ball group by striker) as B, (select striker as player_id, SUM(CASE WHEN runs_per_match >= 50 THEN 1 ELSE 0 END) as fifties, max(runs_per_match) as HS, sum(runs_per_match)*1.0/sum(balls_faced) * 100.0 as strike_rate from (select match_id, striker, Coalesce(sum(runs_scored), 0) as runs_per_match, count(runs_scored) as balls_faced from ball_by_ball group by (match_id, striker)) as A group by player_id) as C, (select striker as player_id, MAX(A)*1.0/SUM(CASE WHEN B = 0 THEN 1 ELSE B END) as average from (select striker, sum(runs_scored) as A, SUM(CASE WHEN out_type is not null THEN 1 ELSE 0 END) as B  from ball_by_ball group by striker) as C group by striker) as D where A.player_id = B.player_id and B.player_id = C.player_id and C.player_id = D.player_id and A.player_id = $1;", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "player": results.rows[0],
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// batting statistics graph 
app.get("/players/bat_stat_graph/:id", async (req, res) => {
    try{
        const results = await db.query("select striker as player_id, match_id, sum(runs_scored) as runs_per_match from ball_by_ball where striker = $1 group by (striker, match_id) order by striker asc, match_id asc;", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "player": results.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// bowling statistics  
app.get("/players/bowl_stat/:id", async (req, res) => {
    try{
        const results = await db.query("select A.bowler as player_id, total_matches, runs, balls, overs, wickets, economy, five_wickets from (select bowler, count(distinct match_id) as total_matches, sum(runs_scored + extra_runs) as runs, Count(*) as balls, count(distinct(match_id, innings_no, over_id)) as overs, SUM(CASE WHEN out_type is not null and out_type != 'retired hurt' and out_type != 'run out' THEN 1 ELSE 0 END) as wickets, sum(runs_scored + extra_runs)*1.0/count(distinct(match_id, innings_no, over_id)) as economy from ball_by_ball group by bowler) as A, (select bowler, SUM(CASE WHEN wickets_per_match >= 5 THEN 1 ELSE 0 END) as five_wickets from (select match_id, bowler,SUM(CASE WHEN out_type is not null and out_type != 'retired hurt' and out_type != 'run out' THEN 1 ELSE 0 END) as wickets_per_match from ball_by_ball group by (match_id, bowler)) as A group by bowler) as B where A.bowler = B.bowler and A.bowler = $1; ", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "player": results.rows[0],
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// bowling statistics graph 
app.get("/players/bowl_stat_graph/:id", async (req, res) => {
    try{
        const results = await db.query("select match_id, bowler as player_id, sum(runs_scored + extra_runs) as runs_scored, SUM(CASE WHEN out_type is not null and out_type != 'retired hurt' and out_type != 'run out' THEN 1 ELSE 0 END) as wickets from ball_by_ball where bowler = $1 group by (match_id, bowler) order by bowler, match_id;", [req.params.id]);
        res.status(200).json({
            status:"sucess",
            results: results.rows.length,
            data: {
                "player": results.rows,
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`The server is up and listening on port ${port}`);
});