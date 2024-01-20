import React, { useState } from "react";
import axios from "axios";

const AddBookForm = ({ onAddBook }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    photoUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7140/api/books",
        newBook
      );
      onAddBook(response.data);
      setNewBook({
        title: "",
        author: "",
        description: "",
        photoUrl: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form style={formStyle} onSubmit={handleAddBook}>
      <h2 style={headerStyle}>Add New Book</h2>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Title:</label>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Author:</label>
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Description:</label>
        <input
          type="text"
          name="description"
          value={newBook.description}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Photo URL:</label>
        <input
          type="text"
          name="photoUrl"
          value={newBook.photoUrl}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />
      </div>
      <button type="submit" style={buttonStyle}>
        Add Book
      </button>
    </form>
  );
};

// Styles
const formStyle = {
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "40px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AddBookForm;
