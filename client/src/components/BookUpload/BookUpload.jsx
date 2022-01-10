import { Typography, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import useStyles from "./BookUploadStyles";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiUrl from "../apiUrl";

const BookUpload = () => {
  const classes = useStyles({});
  const user = useSelector((state) => state.user.user);
  const [book, setBook] = useState({
    title: "",
    authors: "",
    genre: "",
    edition: "",
    pages: "",
    cover: false,
  });

  const handleSubmit = async () => {
    try {
      await axios.post(`${apiUrl}/api/books/suggestion`, {
        username: user.username,
        google: false,
        book: book,
      });
      resetFields();
      notify();
    } catch (error) {
      console.log(error);
    }
    console.log(book);
  };

  const resetFields = () => {
    setBook({
      title: "",
      authors: "",
      genre: "",
      edition: "",
      pages: "",
      review: "",
      bookId: null,
      cover: false,
    });
  };

  const toDataURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBook({ ...book, cover: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const notify = () =>
    toast.success("Suggestion sent!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <div className={classes.pageType}>
        <Typography variant="h2">Add a book</Typography>
      </div>
      <Paper elevation={15} className={classes.inputCard}>
        <div className={classes.leftSideCard}>
          {book.cover && (
            <>
              <img src={book.cover} alt="cover" className={classes.cover} />
              <Button onClick={() => setBook({ ...book, cover: null })}>
                Remove cover
              </Button>
            </>
          )}
          {!book.cover && (
            <div className={`${classes.cover} ${classes.noCover}`}>
              <Button
                className={`${classes.cover} ${classes.noCover}`}
                component="label"
              >
                Add cover
                <input
                  type="file"
                  hidden
                  accept="image/jpeg"
                  onChange={(e) =>
                    setBook({ ...book, cover: toDataURL(e.target.files[0]) })
                  }
                />
              </Button>
            </div>
          )}
          {/* <div className={classes.tips}>
            <Typography variant="body1" className={classes.tipsHeader}>
              Useful tips!
            </Typography>
            <ul>
              <li className={classes.liItem}>
                <Typography variant="body2">
                  Areas marked with <span style={{ color: "red" }}> *</span>{" "}
                  must be filled
                </Typography>
              </li>
              <li className={classes.liItem}>
                <Typography variant="body2">
                  After typing in the title, you can click the "Check" button to
                  see if your book is already in our database. If it is, you can
                  let us fill out the rest of the book information!
                </Typography>
              </li>
            </ul>
            <div className={classes.bar}></div>
            <div className={classes.bar}></div>
          </div> */}
        </div>
        <div className={classes.rightSideCard}>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Title:</Typography>
            </Grid>
            <Grid item lg={9} md={6}>
              <input
                className={classes.inputField}
                type="text"
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                value={book.title}
                placeholder="Type in the book title"
              />
            </Grid>
            <Grid item>
              <div className={classes.required}>*</div>
            </Grid>
            {/* <Grid item lg={2} md={2}>
              <button
                onClick={() => setModal(true)}
                className={`${classes.button} ${classes.checkButton}`}
              >
                <Typography variant="body2">Check</Typography>
              </button>
            </Grid> */}
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Author:</Typography>
            </Grid>
            <Grid item lg={9} md={6}>
              <input
                className={classes.inputField}
                type="text"
                //disabled
                onChange={(e) => setBook({ ...book, authors: e.target.value })}
                value={book.authors}
                placeholder="Type in the book author"
              />
            </Grid>
            <Grid item lg={1} md={1}>
              <div className={classes.required}>*</div>
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Genre:</Typography>
            </Grid>
            <Grid item lg={9} md={6}>
              <input
                className={classes.inputField}
                type="text"
                onChange={(e) => setBook({ ...book, genre: e.target.value })}
                value={book.genre}
                //disabled
                placeholder="Type in the book genre"
              />
            </Grid>
            <Grid item lg={1} md={1}>
              <div className={classes.required}>*</div>
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Edition:</Typography>
            </Grid>
            <Grid item lg={5} md={3}>
              <input
                className={classes.inputField}
                type="text"
                onChange={(e) => setBook({ ...book, edition: e.target.value })}
                value={book.edition}
                //disabled
                placeholder="Date of publishing"
              />
            </Grid>
            <Grid item lg={2} md={2}>
              <Typography variant="h5" sx={{ marginLeft: 1 }}>
                Pages:
              </Typography>
            </Grid>
            <Grid item lg={2} md={1}>
              <input
                className={classes.inputField}
                type="text"
                placeholder="#"
                //disabled
                onChange={(e) => setBook({ ...book, pages: e.target.value })}
                value={book.pages}
              />
            </Grid>
          </Grid>
          {/* <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2} sx={{ display: "flex" }}>
              <Typography variant="h5">Rating:</Typography>
              <div className={classes.required}>*</div>
            </Grid>
            <Rating
              name="size-large"
              value={+rating}
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Grid>
          <Grid
            container
            className={``}
            sx={{
              width: "100%",
              height: "fit-content",
            }}
          >
            <Grid item lg={1} md={1}>
              <Typography variant="h5">Review:</Typography>
            </Grid>
            <Grid item lg={13} md={13}>
              <textarea
                className={`${classes.reviewInput} ${classes.inputField}`}
                placeholder="Enter review"
                rows="15"
                onChange={(e) => setReview(e.target.value)}
                value={review}
              />
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item lg={12} md={12} className={classes.submitButtonDiv}>
              <Button
                variant="contained"
                color="success"
                //fullWidth
                onClick={() => {
                  handleSubmit();
                }}
                className={`${classes.button} ${classes.submitButton}`}
              >
                <Typography variant="body1">Submit</Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>

      <ToastContainer />
    </>
  );
};

export default BookUpload;
