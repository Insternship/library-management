import {
  createBook,
  getAllBooks,
  searchBooksByTitle,
  getBookById,
  updateBook,
  deleteBook,
} from "../services/bookService.js";


export const addBook = async (req, res, next) => {
  try {
    const book = await createBook(req.body);

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};


export const getBooks = async (req, res, next) => {
  try {
    const books = await getAllBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};


export const searchBooks = async (req, res, next) => {
  try {
    const { title } = req.query;

    const books = await searchBooksByTitle(title);

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};


export const getBook = async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};


export const editBook = async (req, res, next) => {
  try {
    const book = await updateBook(req.params.id, req.body);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};


export const removeBook = async (req, res, next) => {
  try {
    const book = await deleteBook(req.params.id);

    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};