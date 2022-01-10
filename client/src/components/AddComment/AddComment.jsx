// KOMPONENTA ODGOVORNA ZA DODAVNJA NOVOG KOMENTARA NA KNJIGE

import { Avatar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "./AddCommentStyles";
import apiUrl from "../apiUrl";
import { Button } from "@mui/material";
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
        <Link to={`/profile/${activeUser.username}`} className={classes.link}>
          <Avatar src={activeUser.avatar} />
        </Link>

        <textarea
          className={`${classes.inputField} ${classes.reviewInput}`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts on the review..."
        ></textarea>
      </div>
      <div className={classes.postCommentDivBottom}>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
