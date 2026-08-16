import { useEffect, useState } from "react";
import axios from "axios";

import BookTable from "../components/BookTable";
import BorrowForm from "../components/BorrowForm";
import EditBookForm from "../components/EditBookForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

 
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalCopies, setTotalCopies] = useState("");

  
  const [selectedBook, setSelectedBook] = useState(null);

 
  const [borrowerName, setBorrowerName] = useState("");
  const [dueDate, setDueDate] = useState("");

  
  const [editingBook, setEditingBook] = useState(null);

  
  const getBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/books"
      );

      setBooks(response.data);
    } catch (error) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  
  const addBook = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await axios.post(
        "http://localhost:5000/api/books",
        {
          title,
          author,
          totalCopies: Number(totalCopies),
          availableCopies: Number(totalCopies),
        }
      );

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

  
  const borrowBook = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await axios.post(
        `http://localhost:5000/api/borrows/${selectedBook._id}`,
        {
          borrowerName,
          dueDate,
        }
      );

      alert("Book borrowed successfully");

      
      setSelectedBook(null);
      setBorrowerName("");
      setDueDate("");

    
      await getBooks();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to borrow book"
      );
    }
  };

 
  const updateBook = async (bookId, updatedData) => {
    try {
      setError("");

      await axios.put(
        `http://localhost:5000/api/books/${bookId}`,
        updatedData
      );

      setEditingBook(null);

      await getBooks();

      alert("Book updated successfully");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update book"
      );
    }
  };

  
  const deleteBook = async (bookId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    setError("");

    await axios.delete(
      `http://localhost:5000/api/books/${bookId}`
    );

    await getBooks();

    alert("Book deleted successfully");
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to delete book"
    );
  }
};

  
  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  
  if (loading) {
    return <h2>Loading books...</h2>;
  }

  return (
    <div>
      <h1>Book List</h1>

      {error && <p>{error}</p>}

      
     <input
  type="text"
  placeholder="Search by title..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

{search && (
  <button type="button" onClick={() => setSearch("")}>
    Clear Search
  </button>
)}

      
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

        <button type="submit">
          Add Book
        </button>
      </form>

      
      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books available</p>
      ) : filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <BookTable
          books={filteredBooks}
          onBorrow={setSelectedBook}
          onEdit={setEditingBook}
          onDelete={deleteBook}
        />
      )}

      
      {selectedBook && (
  <div className="borrow-modal">
    <div className="borrow-modal-content">
      <BorrowForm
        book={selectedBook}
        borrowerName={borrowerName}
        setBorrowerName={setBorrowerName}
        dueDate={dueDate}
        setDueDate={setDueDate}
        onSubmit={borrowBook}
        onCancel={() => {
          setSelectedBook(null);
          setBorrowerName("");
          setDueDate("");
        }}
      />
    </div>
  </div>
)}

    
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSubmit={updateBook}
          onCancel={() => setEditingBook(null)}
        />
      )}
    </div>
  );
};

export default BookList;