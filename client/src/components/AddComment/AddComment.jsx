import { Typography, Grid, Paper, Avatar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import useStyles from "./AddCommentStyles";

import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

const AddComment = ({ userBook, addNewComments }) => {
  const classes = useStyles({});
  const [comment, setComment] = useState("");
  const activeUser = useSelector((state) => state.user.user);

  const handleSubmit = async () => {
    try {
      const newComment = await axios.post(
        `${apiUrl}/api/books/comment`,
        {
          username: activeUser?.username,
          comment: comment,
          userBook: userBook,
        },
        { withCredentials: true }
      );
      addNewComments(newComment.data);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.postCommentDiv}>
      <div className={classes.postCommentDivUpper}>
        <Avatar src={activeUser.avatar} />
        <textarea
          className={`${classes.inputField} ${classes.reviewInput}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts on the review..."
        ></textarea>
      </div>
      <div className={classes.postCommentDivBottom}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddComment;
