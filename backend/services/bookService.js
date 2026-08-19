import Book from "../models/Book.js";


export const createBook = async (bookData) => {
  const { title, author, totalCopies } = bookData;

  const book = await Book.create({
    title,
    author,
    totalCopies,
    availableCopies: totalCopies,
  });

  return book;
};


export const getAllBooks = async () => {
  const books = await Book.find();
  return books;
};


export const searchBooksByTitle = async (title) => {
  const books = await Book.find({
    title: {
      $regex: title,
      $options: "i",
    },
  });

  return books;
};


export const getBookById = async (id) => {
  const book = await Book.findById(id);
  return book;
};


export const updateBook = async (id, updateData) => {
  const book = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return book;
};


export const deleteBook = async (id) => {
  const book = await Book.findByIdAndDelete(id);
  return book;
};