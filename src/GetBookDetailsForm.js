import React, { useState, useEffect } from "react";
import axios from "axios";

const GetBookDetailsForm = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7140/api/Books/${bookId}`
        );
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div style={detailsContainerStyle}>
      <h2 style={headerStyle}>Book Details</h2>
      {bookDetails ? (
        <div style={detailsContentStyle}>
          <p style={detailItemStyle}>
            <strong>Title:</strong> {bookDetails.title}
          </p>
          <p style={detailItemStyle}>
            <strong>Author:</strong> {bookDetails.author}
          </p>
          <p style={detailItemStyle}>
            <strong>Description:</strong> {bookDetails.description}
          </p>
        </div>
      ) : (
        <p style={loadingStyle}>Loading...</p>
      )}
    </div>
  );
};

// Styles
const detailsContainerStyle = {
  margin: "20px 0",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const detailsContentStyle = {
  maxWidth: "400px",
  margin: "auto",
};

const detailItemStyle = {
  marginBottom: "10px",
};

const loadingStyle = {
  textAlign: "center",
};

export default GetBookDetailsForm;
