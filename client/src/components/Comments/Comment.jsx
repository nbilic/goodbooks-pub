import { Typography, Grid, Avatar } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import useStyles from "./CommentsStyles";
import axios from "axios";
import apiUrl from "../apiUrl";
import { Report } from "../index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Comment = ({ comment, setComments, comments }) => {
  const classes = useStyles({});
  const activeUser = useSelector((state) => state.user.user);
  const [modal, setModal] = useState(false);

  const notify = () =>
    toast.success("Report submitted!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/books/comment/${id}`);
      const filteredComments = comments.filter((comment) => comment._id !== id);
      setComments(filteredComments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.comment} key={comment._id}>
      <Link to={`/profile/${comment.username}`} className={classes.link}>
        <Avatar src={comment.avatar} className={classes.avatar} />
      </Link>

      <Grid container className={classes.grid}>
        <Grid item lg={1} className={classes.gridItem}>
          <Typography
            variant="body2"
            className={`${classes.text} ${classes.username}`}
            sx={{ marginRight: 2 }}
          >
            <Link to={`/profile/${comment.username}`} className={classes.link}>
              {comment.username}
            </Link>
          </Typography>{" "}
        </Grid>

        <Grid item lg={4}>
          <Typography
            variant="body2"
            className={`${classes.text} ${classes.username}`}
            sx={{ marginLeft: 2 }}
          >
            {comment.date}
          </Typography>
        </Grid>
        <Grid item lg={7} className={classes.buttonAction}>
          {activeUser.username === comment.username ? (
            <DeleteIcon
              className={classes.icons}
              onClick={() => handleDelete(comment._id)}
            />
          ) : (
            <FlagIcon
              style={{ marginLeft: 5 }}
              className={classes.icons}
              onClick={() => setModal(true)}
            />
          )}
        </Grid>
        <Grid item lg={12}>
          <Typography variant="body1" className={classes.text}>
            {comment.text}
          </Typography>
        </Grid>
      </Grid>
      {modal && (
        <Report setModal={setModal} user={comment.username} notify={notify} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Comment;
