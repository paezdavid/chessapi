const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();

exports.getPuzzleById = async (req, res) => {
    // Connect to the DB
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@clusterchessapi.8lfh9av.mongodb.net/`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect()

    // Connect to the collection
    const collection = await client.db(`${process.env.DB_NAME}`).collection(`${process.env.COLL_NAME}`)
    
    // Find the one puzzle with the given ID
    const puzzleDocument = await collection.findOne({ PuzzleId: req.params.puzzleId })
    delete puzzleDocument._id // Remove _id field

    res.json(puzzleDocument)


}