import {
  Header,
  BookReview,
  AddComment,
  Comments,
} from "../../components/index";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import useStyles from "./DisplayReviewStyles";

const DisplayReview = () => {
  const classes = useStyles({});
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const [newComments, setNewComments] = useState();
  const { book, review, cover, username } = location.state;
  const addNewComments = (newComment) => {
    setNewComments(newComment);
  };

  return (
    <div className={classes.container}>
      <Header />
      <BookReview
        book={book}
        review={review}
        cover={cover}
        username={username}
      />
      <div className={classes.commentContainer}>
        {user.active && (
          <AddComment
            userBook={review.userBookId}
            addNewComments={addNewComments}
          />
        )}
        <Comments userBook={review.userBookId} newComments={newComments} />
      </div>
    </div>
  );
};

export default DisplayReview;
