// book.router.js
const express = require('express');
const router = express.Router();
const {
    createBook,
    getBook,
    getBooks,
    updateBook,
    deleteBook
} = require('../controller/book.controller');

router.post('/book', createBook);
router.get('/book/:id', getBook);
router.get('/books', getBooks);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

module.exports = router;
