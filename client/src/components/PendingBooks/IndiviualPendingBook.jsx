import useStyles from "./PendingsBooksStyles";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiUrl";
const IndividualPendingBook = ({ book, setBooks, books }) => {
  const classes = useStyles({});

  const approve = async () => {
    try {
      await axios.put(`${apiUrl}/api/books/suggestion/approve/${book._id}`, {
        withCredentials: true,
      });
      filter();
    } catch (error) {
      console.log(error);
    }
  };

  const reject = async () => {
    try {
      await axios.delete(`${apiUrl}/api/books/suggestion/denie/${book._id}`, {
        withCredentials: true,
      });
      filter();
    } catch (error) {
      console.log(error);
    }
  };

  const filter = () => {
    const c = books;
    setBooks(c.filter((r) => r !== book));
  };
  return (
    <div className={classes.body}>
      <div style={{ display: "flex" }}>
        <img src={book.cover} className={classes.thumbnail} />
        <div className={classes.bookInfo}>
          <div>
            <Typography variant="subtitle1" sx={{ color: "crimson" }}>
              {book.title}
            </Typography>
            <Typography variant="body2">by {book.authors}</Typography>
          </div>
          <Typography variant="body2">{`${book.genre} - ${book.edition} edition - ${book.pages} pages`}</Typography>
          <Typography variant="subtitle2">
            {`Submitted by `}{" "}
            <Link to={`/profile/${book.submittedBy}`} className={classes.link}>
              {book.submittedBy}
            </Link>
          </Typography>

          <div>
            <Button
              variant="contained"
              color="success"
              sx={{ width: 100 }}
              onClick={approve}
            >
              APPROVE
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ width: 100, marginLeft: 2 }}
              onClick={reject}
            >
              REJECT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPendingBook;
