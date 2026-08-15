const BorrowForm = ({
  book,
  borrowerName,
  setBorrowerName,
  dueDate,
  setDueDate,
  onSubmit,
  onCancel,
}) => {
  return (
    <div>
      <h2>Borrow Book</h2>

      <p>
        Book: <strong>{book.title}</strong>
      </p>

      <form onSubmit={onSubmit}>
        <label>Borrower Name </label>

        <br />

        <input
          type="text"
          placeholder="Enter borrower name"
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
          required
        />

        <br />
        <br />

        <label>Due Date </label>

        <br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">
          Confirm Borrow
        </button>

        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;