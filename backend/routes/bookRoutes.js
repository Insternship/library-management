import express from "express";

import {
  addBook,
  getBooks,
  getBook,
  editBook,
  removeBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", addBook);

router.get("/", getBooks);

router.get("/:id", getBook);

router.put("/:id", editBook);

router.delete("/:id", removeBook);

export default router;