import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../services/bookService.js";


export const addBook = async (req, res) => {
  try {
    const book = await createBook(req.body);

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getBook = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const editBook = async (req, res) => {
  try {
    const book = await updateBook(req.params.id, req.body);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const removeBook = async (req, res) => {
  try {
    const book = await deleteBook(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};