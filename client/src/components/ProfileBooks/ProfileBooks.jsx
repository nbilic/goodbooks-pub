import useStyles from "./ProfileBooksStyles";
import { Link, useParams } from "react-router-dom";
import { Grid, LinearProgress } from "@mui/material";
import axios from "axios";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useEffect, useState } from "react";
import apiUrl from "../apiUrl";

const ProfileBooks = () => {
  const classes = useStyles({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  const handleSort = (e) => {
    let sortedBooks = books.map((a) => {
      return { ...a };
    });
    sortedBooks.sort((a, b) => {
      switch (+e) {
        case 1:
          return a.review.createdAt > b.review.createdAt ? 1 : -1;
        case 2:
          return a.review.createdAt < b.review.createdAt ? 1 : -1;
        case 3:
          return a.bookInfo.title.toUpperCase() > b.bookInfo.title.toUpperCase()
            ? 1
            : -1;
        case 4:
          return a.bookInfo.title.toUpperCase() < b.bookInfo.title.toUpperCase()
            ? 1
            : -1;
        case 5:
          return a.review.rating - b.review.rating;
        case 6:
          return b.review.rating - a.review.rating;
        default:
          break;
      }
    });
    setBooks(sortedBooks);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let userBooks = await axios.get(`${apiUrl}/api/books/all/${username}`);

        setBooks(userBooks.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, [username]);

  if (loading) return <LinearProgress />;
  return (
    <div className={classes.container}>
      <div className={classes.sort}>
        <CompareArrowsIcon className={classes.sortIcon} />
        <span>Sort by</span>
        <select
          name="sort-value"
          className={classes.sortDropdown}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value={1} className={classes.option}>
            {" "}
            Oldest
          </option>
          <option value={2} className={classes.option}>
            Newest
          </option>
          <option value={3} className={classes.option}>
            Name Asc.
          </option>
          <option value={4} className={classes.option}>
            Name Desc.
          </option>
          <option value={5} className={classes.option}>
            Rating Asc.
          </option>
          <option value={6} className={classes.option}>
            Rating Desc.
          </option>
        </select>
      </div>
      <Grid container className={classes.gridContainer}>
        {books.map((book) => (
          <Grid
            item
            lg={2}
            md={3}
            sm={4}
            xs={6}
            key={book.review._id}
            className={classes.gridSeperator}
          >
            <Link
              to={`/book/${book.review.userBookId}`}
              state={{
                book: book.bookInfo,
                review: book.review,
                cover: book.cover,
                username: username,
                bookId: book.bookId,
              }}
            >
              <img
                src={book.cover}
                alt={book.bookInfo.title}
                className={classes.bookCover}
              />
            </Link>
          </Grid>
        ))}
        <span className={classes.gridShelfEnd}></span>
      </Grid>
    </div>
  );
};

export default ProfileBooks;
