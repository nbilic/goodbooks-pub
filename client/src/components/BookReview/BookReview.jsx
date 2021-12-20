import { Typography, Grid, Paper, Rating } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "./BookReviewStyles";
import { useState } from "react";
import { useSelector } from "react-redux";

const BookReview = ({ book, review, cover, username }) => {
  const classes = useStyles({});
  const activeUser = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(review?.rating || 0);
  return (
    <>
      <div className={classes.pageType}>
        <Typography variant="h2">Book review</Typography>
      </div>
      <Paper elevation={15} className={classes.inputCard}>
        <div className={classes.leftSideCard}>
          <div>
            {cover && <img src={cover} alt="cover" className={classes.cover} />}
          </div>
          <div style={{ alignSelf: "flex-start", marginLeft: 5 }}>
            <Typography>Review by: {username} </Typography>
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
            <Grid item lg={2} md={2} sx={{ display: "flex" }}>
              <Typography variant="h5">Rating:</Typography>
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
            <Grid item lg={1} md={1}>
              <Typography variant="h5">Review:</Typography>
            </Grid>
            <Grid item lg={12} md={12}>
              <textarea
                variant="body2"
                disabled={!editMode}
                className={`${classes.inputField} ${classes.reviewInput}`}
                value={review.text || "N/A"}
              ></textarea>
            </Grid>

            <Grid item lg={12} className={classes.whiteSpace}></Grid>
            {activeUser.username === username && (
              <Grid item lg={12} className={`${classes.actionButtonsDiv}`}>
                <div
                  className={`${classes.userOptions} ${classes.editIcon}`}
                  onClick={() => setEditMode(true)}
                >
                  <EditIcon /> <Typography>Edit book</Typography>
                </div>
                <div className={`${classes.userOptions} ${classes.deleteIcon}`}>
                  <DeleteIcon /> <Typography>Delete book</Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default BookReview;
