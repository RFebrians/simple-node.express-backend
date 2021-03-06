const express = require("express");
const router = express.Router();
const fs = require("fs");

// to string . or stringify
const booksData = JSON.parse(
  fs.readFileSync("./api/booksData.json").toString()
);
// const booksData = JSON.parserequire('./api/booksData.js')

// define the home page route
router.get("/", function (req, res) {
  res.json(booksData);
});

router.get("/:bookId", (req, res) => {
  console.log(`Looking for data ${req.params.bookId}`);
  const book = booksData.filter((item) => {
    return item.card === req.params.bookId;
  });
  if (book != "") {
    res.send(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// params
router.get("/title/:query", (req, res) => {
  // TODO urldecode query
  const books = booksData.filter((item) => {
    return item.title.toLowerCase().includes(req.params.query.toLowerCase());
  });

  if (books.length > 0) {
    res.send(books);
  } else {
    res.status(400).send("No Results");
  }
});

// define the about route
router.get("/about", function (req, res) {
  res.send("About Books");
});

module.exports = router;
