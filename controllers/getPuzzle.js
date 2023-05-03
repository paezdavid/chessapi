const { MongoClient, ServerApiVersion } = require('mongodb');

exports.getPuzzleById = async (req, res) => {
    // Connect to the DB
    const uri = `mongodb://127.0.0.1:27017/`;
    const client = new MongoClient(uri);   
    await client.connect()

    // Connect to the collection
    const collection = await client.db(`chessapi`).collection(`puzzles`)
    
    // Find the one puzzle with the given ID
    const puzzleDocument = await collection.findOne({ PuzzleId: req.params.puzzleId })
    delete puzzleDocument._id // Remove _id field

    res.json(puzzleDocument)


}