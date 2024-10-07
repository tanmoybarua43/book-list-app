// book.controller.js
const Book = require('../model/book.model');

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(200).send("Book created successfully!");
    } catch (error) {
        res.status(400).send("Error creating book: " + error.message);
    }
};

// Get a specific book by ID
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(400).send("Error retrieving book: " + error.message);
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).send("Error retrieving books: " + error.message);
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.status(200).send("Book updated successfully!");
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(400).send("Error updating book: " + error.message);
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.status(200).send("Book deleted successfully!");
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(400).send("Error deleting book: " + error.message);
    }
};
