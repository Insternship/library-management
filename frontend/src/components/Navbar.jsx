import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2>📚 Library Management</h2>

      <div>
        <Link to="/">Book List</Link>

        {" | "}

        <Link to="/borrows">Borrow Details</Link>
      </div>
    </nav>
  );
};

export default Navbar;