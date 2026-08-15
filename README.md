# 📚 Library Management System

A full-stack Library Management System built using the MERN stack. The application allows users to manage books, borrow available books, return books, and track borrowing records.

## 🚀 Features

###  Book Management

* Add new books
* View all books
* Edit book details
* Delete books
* Manage total copies
* Manage available copies
* Search books by title
* Display book availability

###  Borrow Management

* Borrow available books
* Prevent borrowing when available copies are `0`
* Automatically reduce available copies after borrowing
* Store borrower details
* Store borrow date and due date
* View all borrowing records
* Return borrowed books
* Automatically increase available copies after returning
* Update borrowing status
* Calculate late fees for overdue books


## 🔒 Concurrency Handling

The application handles concurrent borrowing requests safely.

When a user borrows a book, the backend performs an atomic update that only allows borrowing when:

- availableCopies is greater than 0.

This prevents two users from successfully borrowing the last available copy at the same time. If two requests arrive simultaneously, only one request can reduce the available copies, while the other request fails.


## 💰 Late Fee

A late fee is calculated when a book is returned after its due date.

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

## 🔧 Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* MongoDB Atlas
* npm

##  Project Structure


library-management/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── bookController.js
│   │   └── borrowController.js
│   │
│   ├── models/
│   │   ├── Book.js
│   │   └── Borrow.js
│   │
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   └── borrowRoutes.js
│   │
│   ├── services/
│   │   ├── bookService.js
│   │   └── borrowService.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── AddBookForm.jsx
│   │   │   ├── EditBookForm.jsx
│   │   │   ├── BookList.jsx
│   │   │   ├── BorrowForm.jsx
│   │   │   └── BorrowList.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── BooksPage.jsx
│   │   │   └── BorrowDetails.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md


## 🌐 Pages

### Page 1 — Book List

The Book List page allows users to:

* View all books
* Search books by title
* Add a new book
* Edit a book
* Delete a book
* Borrow a book

The Borrow button is disabled when available copies are `0`.

### Page 2 — Borrow Details

The Borrow Details page displays:

* Book name
* Borrower name
* Borrow date
* Due date
* Borrow status
* Late fee
* Return action

## 📚 CRUD Operations



 Create   -  Add a new book    
 Read     - View all books    
 Update   - Edit book details 
 Delete   - Remove a book     

## 🔌 API Endpoints

### Book Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/books`     | Add a new book    |
| GET    | `/books`     | Get all books     |
| GET    | `/books/:id` | Get a single book |
| PUT    | `/books/:id` | Update a book     |
| DELETE | `/books/:id` | Delete a book     |

### Borrow Endpoints

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/borrow/:bookId`    | Borrow a book          |
| GET    | `/borrow`            | Get all borrow records |
| PUT    | `/borrow/:id/return` | Return a book          |   







## ⚙️ Installation and Setup
### Backend Setup


cd backend
npm install


Create a `.env` file inside the backend folder:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string


Run the backend:


npm run dev


### Frontend Setup

Open a new terminal and run:


cd frontend
npm install
npm run dev


## 🧪 Testing

### Book Management

* Add Book
* View Books
* Edit Book
* Update Available Copies
* Delete Book

### Borrow Management

* Borrow available books
* Prevent borrowing when available copies are `0`
* Reduce available copies after borrowing
* Create borrow records
* Return borrowed books
* Increase available copies after returning

##  Project Goal

This project was built to practice:

* Full CRUD operations
* REST API development
* Routes, Controllers, Services, and Models architecture
* MongoDB and Mongoose
* React frontend integration
* Validation and error handling
* Concurrency handling
* Git branching and Pull Request workflow


