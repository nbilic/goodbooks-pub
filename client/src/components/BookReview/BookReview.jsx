import { Typography, Grid, Paper, Rating, Button } from "@mui/material";
import { LockOpen, Delete, Edit } from "@mui/icons-material";
import useStyles from "./BookReviewStyles";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import apiUrl from "../apiUrl";

const BookReview = ({ book, review, cover, username }) => {
  const classes = useStyles({});
  const { id } = useParams();
  const activeUser = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false);
  const [changedReview, setChangedReview] = useState(review.text);
  const [newText, setNewText] = useState("");
  const [value, setValue] = useState(review?.rating || 0);
  const [newPicture, setNewPicture] = useState(null);
  const toDataURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitChanges = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/BOOKS/${id}`,
        {
          text: newText,
          rating: value,
          cover: newPicture,
        },
        { withCredentials: true }
      );

      setEditMode(false);
      newText.length > 0 && setChangedReview(newText);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className={classes.pageType}>
        <Typography variant="h2">Book review</Typography>
      </div>
      <Paper elevation={15} className={classes.inputCard}>
        <div className={classes.leftSideCard}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {cover && (
              <img
                src={newPicture || cover}
                alt="cover"
                className={classes.cover}
              />
            )}
            {editMode && (
              <Button variant="outlined" component="label">
                <LockOpen /> Change picture
                <input
                  type="file"
                  hidden
                  accept="image/jpeg"
                  onChange={(e) => setNewPicture(toDataURL(e.target.files[0]))}
                />
              </Button>
            )}
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <Typography>
              Review by:{" "}
              <Link to={`/profile/${username}`} className={classes.link}>
                <b> {username}</b>
              </Link>{" "}
            </Typography>
          </div>
        </div>
        <div className={classes.rightSideCard}>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Title:</Typography>
            </Grid>
            <Grid item lg={10} md={10}>
              <Typography variant="body2" className={`${classes.inputField}`}>
                {book.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Author:</Typography>
            </Grid>
            <Grid item lg={10} md={10}>
              <Typography variant="body2" className={`${classes.inputField}`}>
                {book.authors}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Genre:</Typography>
            </Grid>
            <Grid item lg={10} md={10}>
              <Typography variant="body2" className={`${classes.inputField}`}>
                {book.categories}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={`${classes.inputArea}`}>
            <Grid item lg={2} md={2}>
              <Typography variant="h5">Edition:</Typography>
            </Grid>
            <Grid item lg={4} md={4}>
              <Typography
                variant="body2"
                className={`${classes.inputField}`}
                sx={{ textAlign: "center" }}
              >
                {book.publishedDate || "N/A"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3}>
              <Typography variant="h5" sx={{ marginLeft: 1 }}>
                Pages:
              </Typography>
            </Grid>
            <Grid item lg={3} md={3}>
              <Typography
                variant="body2"
                className={`${classes.inputField}`}
                sx={{ textAlign: "center" }}
              >
                {book.pageCount || "N/A"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className={`${classes.inputArea} ${classes.ratingArea}`}
          >
            <Grid
              item
              lg={2}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h5">Rating:</Typography>{" "}
              {editMode && <LockOpen sx={{ marginRight: 10 }} />}
            </Grid>
            <Rating
              name="size-large"
              value={+value}
              readOnly={!editMode}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
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
            <Grid
              item
              lg={1}
              md={1}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="h5">Review:</Typography>{" "}
              {editMode && <LockOpen />}
            </Grid>
            <Grid item lg={12} md={12}>
              <textarea
                disabled={!editMode}
                className={`${classes.inputField} ${classes.reviewInput}`}
                value={!editMode ? changedReview || "N/A" : newText}
                onChange={(e) => setNewText(e.target.value)}
              ></textarea>
            </Grid>

            <Grid item lg={12} className={classes.whiteSpace}></Grid>
            {activeUser.username === username && (
              <Grid item lg={12} className={`${classes.actionButtonsDiv}`}>
                {!editMode ? (
                  <>
                    <div
                      className={`${classes.userOptions} ${classes.editIcon}`}
                      onClick={() => setEditMode(true)}
                    >
                      <Edit /> <Typography>Edit book</Typography>
                    </div>
                    <div
                      className={`${classes.userOptions} ${classes.deleteIcon}`}
                    >
                      <Delete /> <Typography>Delete book</Typography>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Edit mode enabled</Typography>
                    <div>
                      <Button onClick={submitChanges}>Submit</Button>
                      <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default BookReview;
