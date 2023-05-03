const express = require("express");
const router = express.Router()

// Start a server
const app = express();
const port = process.env.PORT || "5500";

// Open the server
app.listen(port, () => console.log(`Listening to requests on http://localhost:${port}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

// Controllers
const { getPuzzles } = require("./controllers/getPuzzles");
const { getPuzzleById } = require("./controllers/getPuzzle");
const { getPuzzlesByRating } = require("./controllers/getPuzzlesByRating");
const { getPuzzlesByTheme } = require("./controllers/getPuzzlesByTheme");

// Routes
app.get("/puzzles", getPuzzles); // Get all puzzles
app.get("/puzzles/:rating", getPuzzlesByRating) // Get all puzzles of a given rating
app.get("/puzzles/themes/:theme", getPuzzlesByTheme) // Get all puzzles of a given theme
app.get("/puzzle/:puzzleId", getPuzzleById) // Get a single puzzle by its Lichess ID






module.exports = router

