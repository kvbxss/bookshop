import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBookForm from "./AddBookForm";
import UpdateBookForm from "./UpdateBookForm";
import GetBookDetailsForm from "./GetBookDetailsForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://localhost:7140/api/books", {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`https://localhost:7140/api/books/${bookId}`);
      setBooks(books.filter((book) => book.id !== bookId));
      setSelectedBook(null);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setSelectedBook(null);
  };

  const handleSelectBook = (bookId) => {
    setSelectedBook(bookId);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Book List</h1>

      <AddBookForm onAddBook={handleAddBook} />
      {selectedBook && (
        <div style={{ marginTop: "20px" }}>
          <UpdateBookForm
            bookId={selectedBook}
            onUpdateBook={handleUpdateBook}
          />
        </div>
      )}

      {selectedBook && <GetBookDetailsForm bookId={selectedBook} />}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Title</th>
            <th style={tableHeaderStyle}>Author</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>Photo</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{book.title}</td>
              <td style={tableCellStyle}>{book.author}</td>
              <td style={tableCellStyle}>{book.description}</td>
              <td style={tableCellStyle}>
                <img
                  src={book.photoUrl}
                  alt={book.title}
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                />
              </td>
              <td style={tableCellStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => handleSelectBook(book.id)}
                >
                  Details
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => handleSelectBook(book.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  wordWrap: "break-word",
  maxWidth: "300px",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};

export default BookList;
