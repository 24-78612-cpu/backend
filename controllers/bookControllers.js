import * as bookService from '../services/bookService.js';

export const fetchAllBooks = async (req, res) =>{ 
    res.status(200).json(books);
}