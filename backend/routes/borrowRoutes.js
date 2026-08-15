import express from "express";

import {
  borrow,
  getBorrows,
  returnBorrowedBook,
  deleteBorrowRecord,
} from "../controllers/borrowController.js";

const router = express.Router();


router.post("/:bookId", borrow);


router.get("/", getBorrows);


router.put("/:borrowId/return", returnBorrowedBook);


router.delete("/:borrowId", deleteBorrowRecord);

export default router;