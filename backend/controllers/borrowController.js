import {
  borrowBook,
  getAllBorrows,
  returnBook,
  deleteBorrow,
} from "../services/borrowService.js";


export const borrow = async (req, res, next) => {
  try {
    const borrowRecord = await borrowBook(
      req.params.bookId,
      req.body
    );

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow: borrowRecord,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};


export const getBorrows = async (req, res, next) => {
  try {
    const borrows = await getAllBorrows();

    res.status(200).json(borrows);
  } catch (error) {
    next(error);
  }
};


export const returnBorrowedBook = async (req, res, next) => {
  try {
    const borrow = await returnBook(req.params.borrowId);

    res.status(200).json({
      message: "Book returned successfully",
      borrow,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
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