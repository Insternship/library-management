import { useEffect, useState } from "react";
import axios from "axios";

const BorrowDetails = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const getBorrows = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/borrows"
      );

      setBorrows(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch borrow records"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBorrows();
  }, []);

  
  const returnBook = async (borrowId) => {
    try {
      setError("");

      const response = await axios.put(
        `http://localhost:5000/api/borrows/${borrowId}/return`
      );

      alert(
        `Book returned successfully! Late Fee: ₹${response.data.borrow.lateFee}`
      );

      await getBorrows();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to return book"
      );
    }
  };

  
  const deleteBorrow = async (borrowId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this borrow record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await axios.delete(
        `http://localhost:5000/api/borrows/${borrowId}`
      );

      alert("Borrow record deleted successfully!");

      await getBorrows();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete borrow record"
      );
    }
  };

  if (loading) {
    return <h2>Loading borrow records...</h2>;
  }

  if (error && borrows.length === 0) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Borrow Details</h1>

      {error && <p>{error}</p>}

      {borrows.length === 0 ? (
        <p>No borrow records found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Borrower</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Late Fee</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow._id}>
                <td>
                  {borrow.book?.title || "Book not found"}
                </td>

                <td>{borrow.borrowerName}</td>

                <td>
                  {new Date(
                    borrow.borrowDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {new Date(
                    borrow.dueDate
                  ).toLocaleDateString()}
                </td>

                <td>{borrow.status}</td>

                <td>₹{borrow.lateFee}</td>

                <td>
                  {borrow.status === "Borrowed" ? (
                    <button
                      onClick={() => returnBook(borrow._id)}
                    >
                      Return
                    </button>
                  ) : (
                    "Returned"
                  )}

                  <button
                    onClick={() => deleteBorrow(borrow._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowDetails;