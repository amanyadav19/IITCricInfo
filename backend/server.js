require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");

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

// get a particular venue
app.get("/venue/:id", async (req, res) => {
    try{
        const results = await db.query("select * from venue where venue_id = $1", [req.params.id]);
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


// adding a venue
app.post("/venues", (req, res) => {

});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`The server is up and listening on port ${port}`);
});