import {
  borrowBook,
  getAllBorrows,
  returnBook,
  deleteBorrow,
} from "../services/borrowService.js";


export const borrow = async (req, res) => {
  try {
    const borrowRecord = await borrowBook(req.params.bookId, req.body);

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow: borrowRecord,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getBorrows = async (req, res) => {
  try {
    const borrows = await getAllBorrows();

    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const returnBorrowedBook = async (req, res) => {
  try {
    const borrow = await returnBook(req.params.borrowId);

    res.status(200).json({
      message: "Book returned successfully",
      borrow,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const deleteBorrowRecord = async (req, res, next) => {
  try {
    const result = await deleteBorrow(req.params.borrowId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};