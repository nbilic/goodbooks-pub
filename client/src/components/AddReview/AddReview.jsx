import useStyles from "./AddReviewStyles";
import { Button, Modal, Typography, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";
import { useSelector } from "react-redux";

const AddReview = ({ setModal, book, notify }) => {
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const activeUser = useSelector((state) => state.user.user);
  const [value, setValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModal(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/books/upload2`,
        {
          username: activeUser.username,
          google: book.google,
          bookId: book.bookId,
          review: {
            text: value,
            rating: rating,
          },
          cover: book?.cover,
        },
        { withCredentials: true }
      );
      handleClose();
      notify();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleOpen();
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.container}>
            <div>
              <img src={book?.cover} className={classes.thumbnail} />
            </div>
            <div className={classes.bookInfo}>
              <Typography variant="subtitle1" sx={{ color: "crimson" }}>
                {book.title}
              </Typography>
              <div variant="body2">
                by{" "}
                {book?.authors?.map((author, index) => (
                  <Typography
                    variant="subtitle2"
                    key={author}
                    style={{ display: "inline" }}
                  >
                    {`${author} ${
                      index !== book?.authors?.length - 1 ? ", " : ""
                    }`}
                  </Typography>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Rating:</Typography>
                <Rating
                  name="size-large"
                  value={+rating}
                  size="medium"
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <Typography variant="subtitle1">Review: </Typography>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                cols="30"
                rows="5"
                required
                className={classes.input}
              ></textarea>

              <div className={classes.button}>
                <Button
                  className={classes.button}
                  disabled={value.length > 0 ? false : true}
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  sx={{ width: 100 }}
                >
                  {" "}
                  Submit{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddReview;
