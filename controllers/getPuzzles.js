const { MongoClient } = require('mongodb');

exports.getPuzzles = async (req, res) => {
    // Connect to the DB
    const uri = `mongodb://127.0.0.1:27017/`;
    const client = new MongoClient(uri);
    await client.connect()

    // Connect to the collection
    const collection = await client.db(`chessapi`).collection(`puzzles`)

    // Get total amount of docs on the DB
    const totalAmountOfDocs = await collection.countDocuments()

    // Pagination data
    const docsPerPage = 15
    const currentPage = req.query.pageNumber || 1

    // Query 15 documents per page
    const resultsCursor = await collection
    .find()
    .limit(docsPerPage)
    .skip((currentPage - 1) * docsPerPage)

    // Insert the documents in an array
    const arrOfPuzzles = []

    for await (const result of resultsCursor) {
        delete result._id // Remove _id field
        arrOfPuzzles.push(result)
    }

    // Insert the documents inside an object along with some extra info
    const json = {
        resultsInfo: {
            totalAmountOfDocs: totalAmountOfDocs,
            previousPage: currentPage === 1 || currentPage == "1" ? null : `http://localhost:5500/puzzles/?pageNumber=${Number(currentPage) - 1}`,
            nextPage: `http://localhost:5500/puzzles/?pageNumber=${Number(currentPage) + 1}`
        },
        data: arrOfPuzzles
    }

    // Return as JSON
    res.json(json)

}
