import * as bookModel from '../models/bookModel.js';

export const fetchAllBooks = async () => {
    return bookModel.fetch();
};

export const createBook = async (book) => {
    return bookModel.create(book);
};

export const updateBook = async (book) => {
    return bookModel.update(book);
};

export const deleteBook = async (id) => {
    return bookModel.remove(id);
};
