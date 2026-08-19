import express from "express";

import {
  addBook,
  getBooks,
  getBook,
  searchBooks,
  editBook,
  removeBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", addBook);

router.get("/", getBooks);


router.get("/search", searchBooks);

router.get("/:id", getBook);

router.put("/:id", editBook);

router.delete("/:id", removeBook);

export default router;