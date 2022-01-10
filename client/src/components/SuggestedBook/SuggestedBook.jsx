import useStyles from "./SuggestedBookStyles";
import { Button, Grid, Typography, Rating } from "@mui/material";
import { AddReview } from "../index";
import { useEffect, useState } from "react";
const SuggestedBook = ({ book, notify, google }) => {
  const classes = useStyles({});
  const [modal, setModal] = useState(false);
  const [bookInfo, setBookInfo] = useState({});

  useEffect(() => {
    if (book.volumeInfo) {
      setBookInfo({
        cover: book?.volumeInfo?.imageLinks?.thumbnail,
        title: book?.volumeInfo?.title,
        authors: book?.volumeInfo?.authors,
        rating: book?.volumeInfo?.averageRating,
        ratingsCount: book?.volumeInfo?.ratingsCount || "0",
        publishedDate: book?.volumeInfo?.publishedDate,
        categories: book?.volumeInfo?.categories,
        bookId: book.volumeInfo.industryIdentifiers[0].identifier,
        google: true,
      });
    } else {
      setBookInfo({
        cover: book?.cover,
        title: book?.title,
        authors: [book?.authors],
        rating: "0",
        ratingsCount: "0",
        publishedDate: book?.edition,
        categories: book?.genre,
        bookId: book._id,
        google: false,
      });
    }
  }, []);
  return (
    <Grid
      item
      lg={12}
      md={12}
      sm={12}
      xs={12}
      key={book.id}
      className={classes.bookPreview}
    >
      <img src={bookInfo?.cover} alt="" className={classes.thumbnail} />
      <div className={classes.bookInfo}>
        <Typography variant="subtitle2" className={classes.title}>
          {bookInfo?.title}
        </Typography>
        <Typography variant="subtitle2">
          by{" "}
          {bookInfo?.authors?.map((author, index) => (
            <div key={author} style={{ display: "inline" }}>
              {`${author} ${
                index !== book?.volumeInfo?.authors?.length - 1 ? ", " : ""
              }`}
            </div>
          ))}
        </Typography>
        <div className={classes.informationDisplay}>
          {bookInfo.rating && (
            <Rating
              name="size-large"
              value={bookInfo?.rating}
              readOnly
              size="small"
              precision={0.5}
            />
          )}
          <Typography
            variant="body2"
            sx={{ marginLeft: 1 }}
          >{` average rating - ${bookInfo?.ratingsCount} ratings`}</Typography>
        </div>

        <Typography variant="body2">
          Published: {bookInfo?.publishedDate}
        </Typography>
        <Typography variant="body2">
          Categories: {bookInfo?.categories}
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ width: 160 }}
          onClick={() => setModal(true)}
        >
          Add to shelf
        </Button>
      </div>
      {modal && (
        <AddReview setModal={setModal} book={bookInfo} notify={notify} />
      )}
    </Grid>
  );
};

export default SuggestedBook;
