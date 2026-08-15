import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./pages/BookList";
import BorrowDetails from "./pages/BorrowDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/borrows" element={<BorrowDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;