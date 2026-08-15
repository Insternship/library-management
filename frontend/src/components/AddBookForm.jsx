import { useState } from "react";
import axios from "axios";

const AddBookForm = ({ getBooks, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalCopies, setTotalCopies] = useState("");

  const addBook = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await axios.post("http://localhost:5000/api/books", {
        title,
        author,
        totalCopies: Number(totalCopies),
        availableCopies: Number(totalCopies),
      });

      setTitle("");
      setAuthor("");
      setTotalCopies("");

      await getBooks();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add book"
      );
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>

      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Total copies"
          value={totalCopies}
          onChange={(e) => setTotalCopies(e.target.value)}
          min="1"
          required
        />

        <button type="submit">Add New Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;