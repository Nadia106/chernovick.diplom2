const express = require("express")
const Book = require("../models/Book");
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams: true})

router.get("/", async (req, res) => {
    try {
        const list = await Book.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже."
        })
    }
})

router.patch("/:bookId", auth, async(req, res) => {
    try {
        const {bookId} = req.params
        const book = await Book.findById(bookId, req.body)
        req.send(book)

    }catch(e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже."
        })
    }
})


module.exports = router