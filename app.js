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
const { getPuzzleByRating } = require("./controllers/getPuzzleByRating");

// Routes
app.get("/puzzles", getPuzzles);
app.get("/puzzles/:rating", getPuzzleByRating)
app.get("/puzzle/:puzzleId", getPuzzleById)


module.exports = router

