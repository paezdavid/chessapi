## An API for Lichess' puzzles database

This is a work in progress and everyone is welcome to collaborate! :)

## Test the API locally with a mock database.

You must have MongoDB installed on your machine.

- ```git clone https://github.com/paezdavid/chessapi.git```
- ```cd chessapi```
- ```git switch local-test```
- **Start the MongoDB local server through mongo shell or MongoDBCompass**
- ```mongoimport --db chessapi --collection puzzles --file puzzles-local-test```
- ```npm install```
- Run ```node app.js```
- Go to ```http://localhost:5500/puzzles```

## How to use the API

As of now, the API has a total of four endpoints. Also, bear in mind that your local collection will only have 100 documents, so the results you get may be a bit limited.

#### Get all puzzles

I am showing you only one document here, but the real response is paginated with a maximum of 15 documents on each page.

`GET http://localhost:5500/puzzles`

#### Response:

```json
{
  "resultsInfo": {
    "totalAmountOfDocs":100,
    "previousPage":null,
    "nextPage":"http://localhost:5500/puzzles/?pageNumber=2"
  },
  "data": [
    {
      "PuzzleId":8,
      "FEN":"r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
      "Moves":"f2g3 e6e7 b2b1 b3c1 b1c1 h6c1",
      "Rating":1902,
      "RatingDeviation":75,
      "Popularity":95,
      "NbPlays":3531,
      "Themes":"crushing hangingPiece long middlegame",
      "GameUrl":"https://lichess.org/787zsVup/black#48",
      "OpeningTags":""
    }
  ]
```

#### Get all puzzles of a given rating

`GET http://localhost:5500/puzzles/{RATING}`

For this example:

`GET http://localhost:5500/puzzles/991`

#### Response:

```json
{
  "resultsInfo": {
    "totalAmountOfDocs":1,
    "previousPage":null,
    "nextPage":null
  },
  "data": [
    {
      "PuzzleId":"001om",
      "FEN":"5r1k/pp4pp/5p2/1BbQp1r1/6K1/7P/1PP3P1/3R3R w - - 2 26",
      "Moves":"g4h4 c5f2 g2g3 f2g3",
      "Rating":991,
      "RatingDeviation":78,
      "Popularity":89,
      "NbPlays":216,
      "Themes":"mate mateIn2 middlegame short",
      "GameUrl":"https://lichess.org/VWOIWtIh#51",
      "OpeningTags":""
    }
  ]
}
```

#### Get all puzzles of a given theme

`GET http://localhost:5500/puzzles/themes/{theme}`

For this example:

I am showing you only one document here, but the real response is paginated with a maximum of 15 documents on each page.

`GET http://localhost:5500/puzzles/themes/fork`

#### Response:

```json
{
  "resultsInfo":{
    "totalAmountOfDocs":18,
    "previousPage":null,
    "nextPage":"http://localhost:5500/puzzles/themes/fork?pageNumber=2"
  },
  "data":[
    {
      "PuzzleId":"001wr",
      "FEN":"r4rk1/p3ppbp/Pp1q1np1/3PpbB1/2B5/2N5/1PPQ1PPP/3RR1K1 w - - 4 18",
      "Moves":"f2f3 d6c5 g1h1 c5c4",
      "Rating":972,
      "RatingDeviation":78,
      "Popularity":94,
      "NbPlays":1266,
      "Themes":"advantage fork master masterVsMaster middlegame short",
      "GameUrl":"https://lichess.org/KnJ2mojX#35",
      "OpeningTags":"Pirc_Defense Pirc_Defense_Classical_Variation"
    }
  ]
}
```

#### Get a single puzzle by its Lichess ID

`GET http://localhost:5500/puzzle/{ID}`

For this example:

`GET http://localhost:5500/puzzle/0000D`

#### Response:

```json
{
  "PuzzleId":"0000D",
  "FEN":"5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27",
  "Moves":"d3d6 f8d8 d6d8 f6d8",
  "Rating":1548,
  "RatingDeviation":74,
  "Popularity":96,
  "NbPlays":20790,
  "Themes":"advantage endgame short",
  "GameUrl":"https://lichess.org/F8M8OS71#53",
  "OpeningTags":""
}
```

