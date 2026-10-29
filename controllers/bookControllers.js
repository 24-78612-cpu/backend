import * as bookService from '../services/bookService.js';

export const fetchAllBooks = async (req, res) => {
    try {
        const books = await bookService.fetchAllBooks();
        res.status(200).json(books);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const createBook = async (req, res) => {
    try {
        const { name, author } = req.body;
        const bookId = await bookService.createBook({ name, author });

        res.status(201).json({
            success: true,
            message: bookId
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const editBook = async (req, res) => {
    try {
        const { name, author } = req.body;
        const id = Number.parseInt(req.params.id, 10);
        const updatedBook = await bookService.updateBook({ id, name, author });

        res.status(200).json({
            success: true,
            message: updatedBook
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const deletedBook = await bookService.deleteBook(id);

        res.status(200).json({
            success: true,
            message: deletedBook
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
