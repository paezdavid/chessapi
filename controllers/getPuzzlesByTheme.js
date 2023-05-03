const { MongoClient } = require('mongodb');

exports.getPuzzlesByTheme = async (req, res) => {
    // Connect to the DB
    const uri = `mongodb://127.0.0.1:27017/`;
    const client = new MongoClient(uri);    
    await client.connect()

    // Connect to the collection
    const collection = await client.db(`chessapi`).collection(`puzzles`)

    // Pagination data
    const docsPerPage = 15
    const currentPage = req.query.pageNumber || 1

    // Get total amount of puzzles by given theme
    const totalAmountOfDocs = await collection.countDocuments({ Themes: new RegExp(req.params.theme) })

    // Query 15 documents per page
    const puzzleDocuments = await collection
    .find({ Themes: { $regex: new RegExp(req.params.theme) } })
    .limit(docsPerPage)
    .skip((currentPage - 1) * docsPerPage)

    const arrOfPuzzles = []

    for await (const doc of puzzleDocuments) {
        delete doc._id // Remove _id field
        arrOfPuzzles.push(doc)
    }

    const json = {
        resultsInfo: {
            totalAmountOfDocs: totalAmountOfDocs,
            previousPage: currentPage === 1 || currentPage == "1" ? null : `http://localhost:5500/puzzles/themes/${req.params.theme}?pageNumber=${Number(currentPage) - 1}`,
            nextPage: totalAmountOfDocs <= 15 ? null : `http://localhost:5500/puzzles/themes/${req.params.theme}?pageNumber=${Number(currentPage) + 1}`
        },
        data: arrOfPuzzles
    }

    res.json(json)
}