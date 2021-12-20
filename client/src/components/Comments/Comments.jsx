import { Typography, Grid, Paper, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import useStyles from "./CommentsStyles";
import axios from "axios";
import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

const Comments = ({ userBook, newComments }) => {
  const classes = useStyles({});
  const [comments, setComments] = useState([]);
  const activeUser = useSelector((state) => state.user.user);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/books/comment/${id}`);
      const filteredComments = comments.filter((comment) => comment._id !== id);
      setComments(filteredComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/books/comments/${userBook}`);

        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);
  useEffect(() => {
    newComments && setComments([newComments, ...comments]);
  }, [newComments]);
  return (
    <div>
      {comments?.map((comment) => (
        <div className={classes.comment} key={comment._id}>
          <Avatar src={comment.avatar} className={classes.avatar} />
          <Grid container className={classes.grid}>
            <Grid item lg={1} className={classes.gridItem}>
              <Typography
                variant="body2"
                className={`${classes.text} ${classes.username}`}
                sx={{ marginRight: 2 }}
              >
                {comment.username}
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
                <FlagIcon className={classes.icons} />
              )}
            </Grid>
            <Grid item lg={12}>
              <Typography variant="body1" className={classes.text}>
                {comment.text}
              </Typography>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default Comments;
