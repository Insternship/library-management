import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js";


export const borrowBook = async (bookId, borrowData) => {
  const { borrowerName, dueDate } = borrowData;

  
  const book = await Book.findOneAndUpdate(
    {
      _id: bookId,
      availableCopies: { $gt: 0 },
    },
    {
      $inc: { availableCopies: -1 },
    },
    {
      returnDocument: "after",
    }
  );

  if (!book) {
    throw new Error("Book is not available");
  }

  const borrow = await Borrow.create({
    borrowerName,
    book: bookId,
    dueDate,
    lateFeePerDay: 10,
  });

  return borrow;
};


export const getAllBorrows = async () => {
  const borrows = await Borrow.find().populate("book");
  return borrows;
};


export const returnBook = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId);

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  if (borrow.status === "Returned") {
    throw new Error("Book already returned");
  }

  const returnDate = new Date();
  const dueDate = new Date(borrow.dueDate);

  let lateFee = 0;

  
  if (returnDate > dueDate) {
    const difference = returnDate - dueDate;

    const lateDays = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    lateFee = lateDays * borrow.lateFeePerDay;
  }

  
  borrow.returnedDate = returnDate;
  borrow.status = "Returned";
  borrow.lateFee = lateFee;

  await borrow.save();

  
  await Book.findByIdAndUpdate(
    borrow.book,
    {
      $inc: { availableCopies: 1 },
    },
    {
      returnDocument: "after",
    }
  );

  return borrow;
};


export const deleteBorrow = async (borrowId) => {
  const borrow = await Borrow.findById(borrowId);

  if (!borrow) {
    throw new Error("Borrow record not found");
  }

  if (borrow.status !== "Returned") {
    throw new Error(
      "Cannot delete a book that has not been returned"
    );
  }

  await Borrow.findByIdAndDelete(borrowId);

  return { message: "Borrow record deleted successfully" };
};