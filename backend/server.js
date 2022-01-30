require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

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

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`The server is up and listening on port ${port}`);
});