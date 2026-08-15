import { useEffect, useState } from "react";

const EditBookForm = ({ book, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setTotalCopies(book.totalCopies);
      setAvailableCopies(book.availableCopies);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(book._id, {
      title,
      author,
      totalCopies: Number(totalCopies),
      availableCopies: Number(availableCopies),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <input
        type="number"
        value={totalCopies}
        onChange={(e) => setTotalCopies(e.target.value)}
        min="1"
        required
      />

      <input
        type="number"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(e.target.value)}
        min="0"
        max={totalCopies}
        required
      />

      <button type="submit">
        Update Book
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;