const express = require('express');
const router = express.Router();

// const authorController= require("../controllers/authorController")
// const bookController= require("../controllers/bookController");
// const newAuthorModel = require('../models/newAuthorModel');

const newAuthorModel = require('../controllers/newAuthorController');
const newPublisherModel = require('../controllers/newPublisherController');
const newBookModel = require('../controllers/newBookController');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/createAuthor", authorController.createAuthor  )
// router.get("/getAuthorsData", authorController.getAuthorsData)
// router.post("/createBook", bookController.createBook  )
// router.get("/getBooksData", bookController.getBooksData)
// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)


router.post("/createAuthor", newAuthorModel.createAuthor)

router.post("/createPublisher", newPublisherModel.createPublisher)

router.post("/createBook", newBookModel.createBook)

router.get("/getBooksWithAuthorAndPublisherDetails", newBookModel.getBooksWithAuthorAndPublisherDetails)

router.put("/books", newBookModel.books)

router.put("/booksByAuthor", newBookModel.booksByAuthor)

module.exports = router;