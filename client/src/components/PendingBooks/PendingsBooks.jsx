import { useEffect, useState } from "react";
import useStyles from "./PendingsBooksStyles";
import axios from "axios";
import apiUrl from "../apiUrl";
import IndividualPendingBook from "./IndiviualPendingBook";
import { LinearProgress, Typography } from "@mui/material";
const PendingBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${apiUrl}/api/books/pending`);
        setBooks(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getBooks();
  }, []);

  if (loading) return <LinearProgress color="secondary" />;
  return (
    <div>
      {books.length === 0 && (
        <Typography variant="subtitle2" sx={{ paddingTop: 5 }}>
          No books pending review
        </Typography>
      )}
      {books.map((book) => (
        <IndividualPendingBook
          book={book}
          key={book._id}
          setBooks={setBooks}
          books={books}
        />
      ))}
    </div>
  );
};

export default PendingBooks;
