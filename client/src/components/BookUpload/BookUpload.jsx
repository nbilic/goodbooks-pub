import { Typography, Grid, Paper, Button, Rating } from "@mui/material";
//import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import useStyles from "./BookUploadStyles";
import { SearchBooks } from "../index";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiUrl from "../apiUrl";

const BookUpload = () => {
  const classes = useStyles({});
  const [rating, setRating] = useState(0);
  const [cover, setCover] = useState(false);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [genre, setGenre] = useState("");
  const [edition, setEdition] = useState("");
  const [pages, setPages] = useState("");
  const [review, setReview] = useState("");
  const [modal, setModal] = useState(false);
  const [bookId, setBookId] = useState(null);
  const user = useSelector((state) => state.user.user);

  /*   const handleRating = (rate) => {
    setRating(rate);
  }; */

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/books/upload2`,
        {
          username: user.username,
          google: true,
          bookId: bookId,
          review: {
            text: review,
            rating: rating,
          },
          cover: cover,
        },
        { withCredentials: true }
      );
      resetFields();
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  const resetFields = () => {
    setTitle("");
    setAuthors("");
    setGenre("");
    setCover(null);
    setEdition("");
    setPages("");
    setReview("");
  };
  const autoFill = (payload) => {
    payload.title && setTitle(payload.title);
    payload.authors && setAuthors(payload.authors);
    payload.genre && setGenre(payload.genre);
    payload.cover && setCover(payload.cover);
    payload.edition && setEdition(payload.edition);
    payload.pages && setPages(payload.pages);
    payload.bookId && setBookId(payload.bookId);
  };

  const toDataURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const notify = () =>
    toast.success("Book added!", {
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
          {cover && (
            <>
              <img src={cover} alt="cover" className={classes.cover} />
              <Button onClick={() => setCover(null)}>Remove cover</Button>
            </>
          )}
          {!cover && (
            <div className={`${classes.cover} ${classes.noCover}`}>
              <Button
                className={`${classes.cover} ${classes.noCover}`}
                component="label-"
              >
                Add cover
                <input
                  type="file"
                  hidden
                  onChange={(e) => setCover(toDataURL(e.target.files[0]))}
                />
              </Button>
            </div>
          )}
          <div className={classes.tips}>
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
          </div>
        </div>
        <div className={classes.rightSideCard}>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Title:</Typography>
            </Grid>
            <Grid item lg={6} md={6}>
              <input
                className={classes.inputField}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Type in the book title"
              />
            </Grid>
            <Grid item>
              <div className={classes.required}>*</div>
            </Grid>
            <Grid item lg={2} md={2}>
              <button
                onClick={() => setModal(true)}
                className={`${classes.button} ${classes.checkButton}`}
              >
                <Typography variant="body2">Check</Typography>
              </button>
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Author:</Typography>
            </Grid>
            <Grid item lg={6} md={6}>
              <input
                className={classes.inputField}
                type="text"
                disabled
                onChange={(e) => setAuthors(e.target.value)}
                value={authors}
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
            <Grid item lg={6} md={6}>
              <input
                className={classes.inputField}
                type="text"
                onChange={(e) => setGenre(e.target.value)}
                value={genre}
                disabled
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
            <Grid item lg={3} md={3}>
              <input
                className={classes.inputField}
                type="text"
                onChange={(e) => setEdition(e.target.value)}
                value={edition}
                disabled
                placeholder="Date of publishing"
              />
            </Grid>
            <Grid item lg={2} md={2}>
              <Typography variant="h5" sx={{ marginLeft: 1 }}>
                Pages:
              </Typography>
            </Grid>
            <Grid item lg={1} md={1}>
              <input
                className={classes.inputField}
                type="text"
                placeholder="#"
                disabled
                onChange={(e) => setPages(e.target.value)}
                value={pages}
              />
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
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
          </Grid>
          <Grid container>
            <Grid item lg={12} md={12} className={classes.submitButtonDiv}>
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className={`${classes.button} ${classes.submitButton}`}
              >
                <Typography variant="body1">Submit</Typography>
              </button>
            </Grid>
          </Grid>
        </div>
      </Paper>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {modal && (
        <SearchBooks title={title} setModal={setModal} autoFill={autoFill} />
      )}
    </>
  );
};

export default BookUpload;
