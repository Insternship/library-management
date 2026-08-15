const BookTable = ({
  books,
  onBorrow,
  onEdit,
  onDelete,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Status</th>
          <th>Available Copies</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>

            <td>
              {book.availableCopies > 0
                ? "Available"
                : "Borrowed"}
            </td>

            <td>{book.availableCopies}</td>

            <td>
              <button
                type="button"
                disabled={book.availableCopies <= 0}
                onClick={() => {
                  console.log("Borrow clicked:", book);
                  onBorrow(book);
                }}
              >
                Borrow
              </button>

              <button
                type="button"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(book._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;